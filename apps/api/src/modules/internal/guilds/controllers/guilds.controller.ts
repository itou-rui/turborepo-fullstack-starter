import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { type APIGuild } from '@workspace/types';
import { GuildNotFoundException } from 'utils/exceptions';
import { CreateGuildDto } from '../dtos';
import { GuildsService } from '../services';

@Controller('guilds')
export class GuildsController {
  constructor(private readonly guildsService: GuildsService) {}

  @Get()
  async findAll(): Promise<APIGuild[]> {
    const guilds = await this.guildsService.findAll();
    return guilds.map((guild) => this.guildsService.toAPIGuild(guild));
  }

  @Get(':guildId')
  async findOne(@Param('guildId') guildId: string): Promise<APIGuild> {
    const guild = await this.guildsService.findByUid(guildId);
    if (guild === null) {
      throw new GuildNotFoundException(guildId);
    }
    return this.guildsService.toAPIGuild(guild);
  }

  @Post()
  async create(@Body() data: CreateGuildDto): Promise<APIGuild> {
    const guild = await this.guildsService.create(data);
    return this.guildsService.toAPIGuild(guild);
  }
}
