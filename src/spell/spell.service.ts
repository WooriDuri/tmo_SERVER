import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SpellEntity } from 'src/entities/spell.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SpellService {
  constructor(
    @InjectRepository(SpellEntity)
    private readonly spellRepository: Repository<SpellEntity>,
  ) {}

  async findSpellByChampionId(championId: number) {
    try {
      return this.spellRepository
        .createQueryBuilder('spell')
        .select('spell.spell1', 'spell1')
        .addSelect('spell.spell2', 'spell2')
        .where('spell.champion_id = :championId', { championId })
        .getRawOne();
    } catch (error) {
      console.log(error);
      throw new HttpException('Internal Server Error', 500);
    }
  }
}
