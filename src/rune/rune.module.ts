import { Module } from '@nestjs/common';
import { RuneService } from './rune.service';
import { RuneController } from './rune.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RuneMainEntity } from 'src/entities/rune_main.entity';
import { RuneStatEntity } from 'src/entities/rune_stat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RuneMainEntity, RuneStatEntity])],
  providers: [RuneService],
  controllers: [RuneController],
  exports: [RuneService],
})
export class RuneModule {}
