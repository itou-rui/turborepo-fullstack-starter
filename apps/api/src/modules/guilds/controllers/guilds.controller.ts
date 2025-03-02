import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { type RESTGetAPIGuildResult } from '@workspace/types';
import { GuildNotFoundException } from 'utils/exceptions';
import { GuilldsService } from '../services';
import { CreateGuildDto } from '../dto';

@Controller('guilds')
export class GuildssController {
  constructor(private readonly guildsService: GuilldsService) {}

  @Get()
  async findAll(): Promise<RESTGetAPIGuildResult[]> {
    const guilds = await this.guildsService.findAll();
    return guilds.map((guild) => this.guildsService.toAPIGuild(guild));
  }

  @Get(':guildId')
  async findOne(@Param('guildId') guildId: string): Promise<RESTGetAPIGuildResult> {
    const guild = await this.guildsService.findByUid(guildId);
    if (guild === null) {
      throw new GuildNotFoundException(guildId);
    }
    return this.guildsService.toAPIGuild(guild);
  }

  @Post()
  async create(@Body() data: CreateGuildDto): Promise<RESTGetAPIGuildResult> {
    const guild = await this.guildsService.create(data);
    return this.guildsService.toAPIGuild(guild);
  }
}
