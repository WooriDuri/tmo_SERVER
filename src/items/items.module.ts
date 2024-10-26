import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { ChampItemEntity } from 'src/entities/champ_item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemEntity } from 'src/entities/item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChampItemEntity, ItemEntity])],
  providers: [ItemsService],
  controllers: [ItemsController],
  exports: [ItemsService],
})
export class ItemsModule {}
