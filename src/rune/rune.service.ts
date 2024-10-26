import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RuneMainEntity } from 'src/entities/rune_main.entity';
import { RuneStatEntity } from 'src/entities/rune_stat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RuneService {
  constructor(
    @InjectRepository(RuneMainEntity)
    private readonly runeMainRepository: Repository<RuneMainEntity>,
    @InjectRepository(RuneStatEntity)
    private readonly runeStatRepository: Repository<RuneStatEntity>,
  ) {}

  async findMainRuneByChampionId(championId: number) {
    try {
      const primaryRune = await this.runeMainRepository
        .createQueryBuilder('runeMain')
        .select('runeMain.primary_rune', 'primary_rune')
        .addSelect('COUNT(runeMain.primary_rune)', 'count')
        .addSelect('runeMain.primary_style', 'primary_style')
        .where('runeMain.champ_id = :championId', { championId })
        .groupBy('runeMain.primary_rune')
        .addGroupBy('runeMain.primary_style')
        .orderBy('count', 'DESC')
        .limit(1)
        .getRawOne();
      const secondaryRune = await this.runeStatRepository
        .createQueryBuilder('runeMain')
        .select('runeMain.secondary_rune', 'secondary_rune')
        .addSelect('COUNT(runeMain.secondary_rune)', 'count')
        .addSelect('runeMain.secondary_style', 'secondary_style')
        .where('runeMain.champ_id = :championId', { championId })
        .groupBy('runeMain.secondary_rune')
        .addGroupBy('runeMain.secondary_style')
        .orderBy('count', 'DESC')
        .limit(1)
        .getRawOne();

      return { primaryRune, secondaryRune };
    } catch (error) {
      console.log(error);
      throw new HttpException('Internal Server Error', 500);
    }
  }

  async findStatRuneByChampionId(championId: number) {
    try {
      const offense = await this.runeStatRepository
        .createQueryBuilder('runeStat')
        .select('runeStat.offense')
        .addSelect('COUNT(runeStat.offense)', 'count')
        .where('runeStat.champ_id = :championId', { championId })
        .groupBy('runeStat.offense')
        .orderBy('count', 'DESC')
        .limit(1)
        .getRawOne();

      const defense = await this.runeStatRepository
        .createQueryBuilder('runeStat')
        .select('runeStat.defense')
        .addSelect('COUNT(runeStat.defense)', 'count')
        .where('runeStat.champ_id = :championId', { championId })
        .groupBy('runeStat.defense')
        .orderBy('count', 'DESC')
        .limit(1)
        .getRawOne();

      const flex = await this.runeStatRepository
        .createQueryBuilder('runeStat')
        .select('runeStat.flex')
        .addSelect('COUNT(runeStat.flex)', 'count')
        .where('runeStat.champ_id = :championId', { championId })
        .groupBy('runeStat.flex')
        .orderBy('count', 'DESC')
        .limit(1)
        .getRawOne();

      return {
        offense: offense?.offense,
        defense: defense?.defense,
        flex: flex?.flex,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException('Internal Server Error', 500);
    }
  }

  async findChampVsChampRune(championId: number, vsChampionId: number) {
    try {
      const champRune = await this.runeMainRepository
        .createQueryBuilder('runeMain')
        .select('runeMain.primary_rune', 'primary_rune')
        .addSelect('COUNT(runeMain.primary_rune)', 'count')
        .addSelect('runeMain.primary_style', 'primary_style')
        .where('runeMain.champ_id = :champId', { championId })
        .andWhere('runeMain.vs_champ_id = :vsChampId', { vsChampionId })
        .groupBy('runeMain.primary_rune')
        .addGroupBy('runeMain.primary_style')
        .orderBy('count', 'DESC')
        .limit(1)
        .getRawOne();

      const secondaryRune = await this.runeMainRepository
        .createQueryBuilder('runeMain')
        .select('runeMain.secondary_rune', 'secondary_rune')
        .addSelect('COUNT(runeMain.secondary_rune)', 'count')
        .addSelect('runeMain.secondary_style', 'secondary_style')
        .where('runeMain.champ_id = :championId', { championId })
        .andWhere('runeMain.vs_champ_id = :vsChampId', { vsChampionId })
        .groupBy('runeMain.secondary_rune')
        .addGroupBy('runeMain.secondary_style')
        .orderBy('count', 'DESC')
        .limit(1)
        .getRawOne();

      return { champRune, secondaryRune };
    } catch (error) {
      console.log(error);
      throw new HttpException('Internal Server Error', 500);
    }
  }
}
