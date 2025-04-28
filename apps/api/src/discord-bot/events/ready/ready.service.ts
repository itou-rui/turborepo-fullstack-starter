import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import {
  CommandsService as NecordCommandsService,
  ExplorerService,
  SlashCommandDiscovery,
  SlashCommandsService,
  SlashCommand,
} from 'necord';
import { CommandsService, Command } from 'modules/internal';

@Injectable()
export class ReadyService implements OnApplicationBootstrap {
  private readonly COMMAND_UPDATE_INTERVAL = 300000; // 5 minutes
  private updateInterval: NodeJS.Timeout | null = null;
  private readonly logger = new Logger(ReadyService.name);

  constructor(
    private readonly commandsService: CommandsService,

    /** Service for handling slash commands. */
    private readonly slashCommandService: SlashCommandsService,

    /** Service for exploring slash command metadata */
    private readonly explorerService: ExplorerService<SlashCommandDiscovery>,

    /** Service for handling general commands. */
    private readonly commandService: NecordCommandsService,
  ) {}

  /**
   * Fetches dynamic commands that are currently active.
   */
  protected async fetchDynamicCommands(): Promise<Command[]> {
    try {
      return this.commandsService.findActiveCommands();
    } catch (e: unknown) {
      this.logger.error('Failed to fetch dynamic commands', {
        error: e,
        souceLocation: { file: 'command.service.ts', line: 59, function: 'fetchDynamicCommands' },
      });
      return [];
    }
  }

  /**
   * Adds a public command to the slash command service.
   * @param {SlashCommandDiscovery} command - The command to add.
   */
  protected addPublicCommand(command: SlashCommandDiscovery) {
    this.slashCommandService.add(command);
    return { type: 'Public' as const, name: command.getName() };
  }

  /**
   * Adds a dynamic command to the slash command service and sets its guilds.
   * @param {SlashCommandDiscovery} command - The command to add.
   * @param {Command['guilds']} guilds - The guilds to which the command should be added.
   */
  protected addDynamicCommand(command: SlashCommandDiscovery, guilds: Command['guilds']) {
    this.slashCommandService.add(command);
    command.setGuilds(guilds.map((g) => g.uid));
    return { type: 'Dynamic' as const, name: command.getName(), guilds };
  }

  protected getSlashCommands() {
    return this.explorerService.explore(SlashCommand.KEY);
  }

  protected removeSlashCommand(command: SlashCommandDiscovery) {
    return this.slashCommandService.remove(command.getName());
  }

  async addSlashCommand(dbCommands: Command[], slashCommand: SlashCommandDiscovery) {
    this.removeSlashCommand(slashCommand);
    const dynamicCommand = dbCommands.find((d) => d.name === slashCommand.getName());

    // DynamicCommand
    if (dbCommands.length > 0 && dynamicCommand) {
      return this.addDynamicCommand(slashCommand, dynamicCommand.guilds);
    }

    // PublicCommand
    else {
      return this.addPublicCommand(slashCommand);
    }
  }

  async addSlashCommands() {
    const dbCommands = await this.fetchDynamicCommands();

    const slashCommands = this.explorerService.explore(SlashCommand.KEY);
    if (slashCommands.length === 0) {
      this.logger.log(
        'There were no SlashCommands to update. If this result is not expected, please check if the commands are registered in the DiscordModule.',
      );
      return [];
    }

    const result: ReturnType<typeof this.addPublicCommand | typeof this.addDynamicCommand>[] = [];
    for (const slashCommand of slashCommands) {
      result.push(await this.addSlashCommand(dbCommands, slashCommand));
    }

    this.logger.log(`Added ${result.length} commands ✨`, { commands: result });

    return result;
  }

  /**
   * Updates the metadata for all commands.
   * Fetches dynamic commands from the database and compares them with the commands in the Discord client.
   * If there are no commands, logs a message and returns.
   * Otherwise, updates the commands in the Discord client.
   */
  async updateCommandsMeta() {
    const result = await this.addSlashCommands();
    return this.logger.log(`Updated ${result.length} commands ✨`, { commands: result });
  }

  /**
   * Lifecycle hook that is called once the application has fully started.
   * It sets up the Discord client to update command metadata and register all commands
   * once the client is ready.
   */
  async onApplicationBootstrap() {
    await this.addSlashCommands();
    setInterval(() => this.updateCommandsMeta(), this.COMMAND_UPDATE_INTERVAL);
    await this.commandService.registerAllCommands();
  }

  /**
   * Handles the application shutdown process.
   * Clears the update interval if it is set and logs the cleanup action.
   */
  async onApplicationShutdown() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.logger.verbose('Cleaned up command update interval');
    }
  }
}
