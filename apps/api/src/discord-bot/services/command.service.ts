import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CommandsService, ExplorerService, SlashCommandDiscovery, SlashCommandsService, SlashCommand } from 'necord';
import { Command, type CommandModel } from 'database/discord';

@Injectable()
export class CommandService implements OnApplicationBootstrap {
  private readonly COMMAND_UPDATE_INTERVAL = 300000; // 5 minutes
  private updateInterval: NodeJS.Timeout | null = null;
  private readonly logger = new Logger(CommandService.name);

  constructor(
    @InjectModel(Command.name, 'discord')
    private commandModel: CommandModel,

    /**
     * Service for handling slash commands.
     */
    private readonly slashCommandService: SlashCommandsService,

    /**
     * Service for exploring slash command metadata.
     */
    private readonly explorerService: ExplorerService<SlashCommandDiscovery>,

    /**
     * Service for handling general commands.
     */
    private readonly commandService: CommandsService,
  ) {}

  /**
   * Lifecycle hook that is called once the application has fully started.
   * It sets up the Discord client to update command metadata and register all commands
   * once the client is ready.
   */
  async onApplicationBootstrap() {
    await this.updateCommandsMeta();
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

  /**
   * Fetches dynamic commands that are currently active.
   */
  async fetchDynamicCommands(): Promise<Command[]> {
    try {
      return await this.commandModel.find({ active: true }).populate('guilds').exec();
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
  addPublicCommand(command: SlashCommandDiscovery) {
    this.slashCommandService.add(command);
    return { type: 'Public' as const, name: command.getName() };
  }

  /**
   * Adds a dynamic command to the slash command service and sets its guilds.
   * @param {SlashCommandDiscovery} command - The command to add.
   * @param {Command['guilds']} guilds - The guilds to which the command should be added.
   */
  addDynamicCommand(command: SlashCommandDiscovery, guilds: Command['guilds']) {
    this.slashCommandService.add(command);
    command.setGuilds(guilds.map((g) => g.uid));
    return { type: 'Dynamic' as const, name: command.getName(), guilds };
  }

  /**
   * Updates the metadata for all commands.
   * Fetches dynamic commands from the database and compares them with the commands in the Discord client.
   * If there are no commands, logs a message and returns.
   * Otherwise, updates the commands in the Discord client.
   */
  async updateCommandsMeta() {
    const db = await this.fetchDynamicCommands();

    /**
     * If there are no commands return.
     */
    const slashCommands = this.explorerService.explore(SlashCommand.KEY);
    if (slashCommands.length === 0) {
      return this.logger.log(
        'There were no SlashCommands to update. If this result is not expected, please check if the commands are registered in the DiscordModule.',
      );
    }

    /**
     * Compare the commands in the database with the commands in the Discord client.
     */
    const result: ReturnType<typeof this.addPublicCommand | typeof this.addDynamicCommand>[] = [];
    for (const command of slashCommands) {
      /**
       * Reset the command once
       */
      this.slashCommandService.remove(command.getName());

      const dynamicCommand = db.find((d) => d.name === command.getName());

      // DynamicCommand
      if (db.length > 0 && dynamicCommand) {
        result.push(this.addDynamicCommand(command, dynamicCommand.guilds));
      }

      // PublicCommand
      else {
        result.push(this.addPublicCommand(command));
      }
    }

    return this.logger.log(`Updated ${result.length} commands ✨`, { commands: result });
  }
}
