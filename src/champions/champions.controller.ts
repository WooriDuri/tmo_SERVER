import { Controller, Get, Param, Query } from '@nestjs/common';
import { ChampionsService } from './champions.service';
import { ChampSearchDto } from './dto/champ_search.dto';

@Controller('champions')
export class ChampionsController {
  constructor(private readonly championsService: ChampionsService) {}

  @Get(':championId')
  async findChampionByChampionId(@Param('championId') championId: number) {
    return await this.championsService.findChampionByChampionId(championId);
  }

  @Get()
  async findChampVsChamp(
    @Query('ChampSearchDto') champSearchDto: ChampSearchDto,
  ) {
    return await this.championsService.findChampVsChamp(champSearchDto);
  }
}
