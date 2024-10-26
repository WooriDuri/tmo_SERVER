import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChampSkillEntity } from 'src/entities/champ_skill.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(ChampSkillEntity)
    private readonly championSkillRepository: Repository<ChampSkillEntity>,
  ) {}

  async findSkillByChampionId(championId: number) {
    try {
      return this.championSkillRepository
        .createQueryBuilder('champSkill')
        .select('champSkill.skills', 'skills')
        .addSelect('COUNT(champSkill.skills)', 'count')
        .where('champSkill.champ_id = :championId', { championId })
        .groupBy('champSkill.skills')
        .orderBy('count', 'DESC')
        .limit(1)
        .getRawOne();
    } catch (error) {
      console.log(error);
      throw new HttpException('Internal Server Error', 500);
    }
  }
}
