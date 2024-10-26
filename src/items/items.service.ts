import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChampItemEntity } from 'src/entities/champ_item.entity';
import { ItemEntity } from 'src/entities/item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(ChampItemEntity)
    private readonly champItemRepository: Repository<ChampItemEntity>,
    @InjectRepository(ItemEntity)
    private readonly itemRepository: Repository<ItemEntity>,
  ) {}

  async findCoreItemsByChampionId(championId: number) {
    try {
      return this.champItemRepository
        .createQueryBuilder('champItem')
        .innerJoinAndSelect(
          ItemEntity,
          'item',
          'champItem.item_id = item.item_id',
        )
        .select('item.item_id')
        .addSelect('COUNT(champItem.item_id)', 'count')
        .where('champItem.champ_id = :championId', { championId })
        .andWhere('item.into = :intoValue', { intoValue: 0 })
        .groupBy('item.item_id')
        .orderBy('count', 'DESC')
        .limit(6)
        .getRawMany();
    } catch (error) {
      console.log(error);
      throw new HttpException('Internal Server Error', 500);
    }
  }

  async findStartItemsByChampionId(championId: number) {
    try {
      return this.champItemRepository
        .createQueryBuilder('champItem')
        .innerJoinAndSelect(
          ItemEntity,
          'item',
          'champItem.item_id = item.item_id',
        )
        .select('item.item_id')
        .addSelect('COUNT(champItem.item_id)', 'count')
        .where('champItem.champ_id = :championId', { championId })
        .andWhere('champItem.timestamp < :intoValue', { intoValue: 200000 })
        .groupBy('item.item_id')
        .orderBy('count', 'DESC')
        .limit(3)
        .getRawMany();
    } catch (error) {
      console.log(error);
      throw new HttpException('Internal Server Error', 500);
    }
  }

  async findCoreItemsByChampVsChamp(champ_id: number, vs_champ_id: number) {
    try {
      return this.champItemRepository
        .createQueryBuilder('champItem')
        .innerJoinAndSelect(
          ItemEntity,
          'item',
          'champItem.item_id = item.item_id',
        )
        .select('item.item_id')
        .addSelect('COUNT(champItem.item_id)', 'count')
        .where('champItem.champ_id = :champ_id', { champ_id })
        .andWhere('champItem.vs_champ_id = :vs_champ_id', { vs_champ_id })
        .andWhere('item.into = :intoValue', { intoValue: 0 })
        .groupBy('item.item_id')
        .orderBy('count', 'DESC')
        .limit(6)
        .getRawMany();
    } catch (error) {
      console.log(error);
      throw new HttpException('Internal Server Error', 500);
    }
  }

  async findStartItemsByChampVsChamp(champ_id: number, vs_champ_id: number) {
    try {
      return this.champItemRepository
        .createQueryBuilder('champItem')
        .innerJoinAndSelect(
          ItemEntity,
          'item',
          'champItem.item_id = item.item_id',
        )
        .select('item.item_id')
        .addSelect('COUNT(champItem.item_id)', 'count')
        .where('champItem.champ_id = :champ_id', { champ_id })
        .andWhere('champItem.vs_champ_id = :vs_champ_id', { vs_champ_id })
        .andWhere('champItem.timestamp < :intoValue', { intoValue: 200000 })
        .groupBy('item.item_id')
        .orderBy('count', 'DESC')
        .limit(3)
        .getRawMany();
    } catch (error) {
      console.log(error);
      throw new HttpException('Internal Server Error', 500);
    }
  }
}
