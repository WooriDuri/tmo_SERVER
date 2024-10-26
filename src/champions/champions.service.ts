import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Champion } from 'src/entities/champion.entity';
import { ChampionWinEntity } from 'src/entities/champion_win.entity';
import { ItemsService } from 'src/items/items.service';
import { RuneService } from 'src/rune/rune.service';
import { SkillService } from 'src/skill/skill.service';
import { SpellService } from 'src/spell/spell.service';
import { Repository } from 'typeorm';
import { ChampSearchDto } from './dto/champ_search.dto';

@Injectable()
export class ChampionsService {
  constructor(
    @InjectRepository(Champion)
    private readonly championRepository: Repository<Champion>,
    @InjectRepository(ChampionWinEntity)
    private readonly championWinRepository: Repository<ChampionWinEntity>,
    private readonly runeService: RuneService,
    private readonly skillService: SkillService,
    private readonly spellService: SpellService,
    private readonly itemsService: ItemsService,
  ) {}

  async findChampionByChampionId(championId: number) {
    try {
      // 승률, 메인룬, 스탯룬, 스킬, 스펠, 코어아이템, 시작아이템
      const allRate = await this.championWinRepository.find({
        where: { champ_id: championId },
      });
      const winRate = await this.championWinRepository.find({
        where: { champ_id: championId, win: true },
      });
      const winPercentage = ((winRate.length / allRate.length) * 100).toFixed(
        2,
      );
      //메인 룬
      const rune = await this.runeService.findMainRuneByChampionId(championId);
      // 스탯
      const stat = await this.runeService.findStatRuneByChampionId(championId);
      // 스킬
      const skills = await this.skillService.findSkillByChampionId(championId);
      // 스펠
      // 코어 아이템
      const coreItem = await this.itemsService.findCoreItemsByChampionId(
        championId,
      );
      // 시작 아이템
      const startItem = await this.itemsService.findStartItemsByChampionId(
        championId,
      );

      return {
        winPercentage,
        rune,
        stat,
        skills,
        coreItem,
        startItem,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException('Internal Server Error', 500);
    }
  }

  async findChampVsChamp(champSearchDto: ChampSearchDto) {
    try {
      // 룬 빌드, 게임수, 승률, 스킬 마스터 순서( q -> w-> e ) 이런식, 시작아이템, 가장 많이 간 아이템
      const allRate = await this.championWinRepository.find({
        where: {
          champ_id: champSearchDto.champ_id,
          vs_champ_id: champSearchDto.vs_champ_id,
        },
      });
      const winRate = await this.championWinRepository.find({
        where: {
          champ_id: champSearchDto.champ_id,
          vs_champ_id: champSearchDto.vs_champ_id,
          win: true,
        },
      });
      const winPercentage = ((winRate.length / allRate.length) * 100).toFixed(
        2,
      );
      //메인 룬
      const rune = await this.runeService.findChampVsChampRune(
        champSearchDto.champ_id,
        champSearchDto.vs_champ_id,
      );
      // 스탯
      const stat = await this.runeService.findStatRuneByChampionId(
        champSearchDto.champ_id,
      );
      //스킬
      const skills = await this.skillService.findSkillByChampVsChamp(
        champSearchDto.champ_id,
        champSearchDto.vs_champ_id,
      );
      //코어 아이템
      const coreItem = await this.itemsService.findCoreItemsByChampVsChamp(
        champSearchDto.champ_id,
        champSearchDto.vs_champ_id,
      );
      //시작 아이템
      const startItem = await this.itemsService.findStartItemsByChampVsChamp(
        champSearchDto.champ_id,
        champSearchDto.vs_champ_id,
      );
      return {
        winPercentage,
        matchCount: allRate.length,
        winCount: winRate.length,
        rune,
        stat,
        skills,
        coreItem,
        startItem,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException('Internal Server Error', 500);
    }
  }
}
