import { Module } from '@nestjs/common';
import { ChampionsController } from './champions.controller';
import { ChampionsService } from './champions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Champion } from 'src/entities/champion.entity';
import { ChampionWinEntity } from 'src/entities/champion_win.entity';
import { RuneModule } from 'src/rune/rune.module';
import { SkillModule } from 'src/skill/skill.module';
import { SpellModule } from 'src/spell/spell.module';
import { ItemsModule } from 'src/items/items.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Champion, ChampionWinEntity]),
    RuneModule,
    SkillModule,
    SpellModule,
    ItemsModule,
  ],
  controllers: [ChampionsController],
  providers: [ChampionsService],
  exports: [ChampionsService],
})
export class ChampionsModule {}
