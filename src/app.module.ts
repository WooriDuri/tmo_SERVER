import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChampionsModule } from './champions/champions.module';
import { RuneModule } from './rune/rune.module';
import { SkillModule } from './skill/skill.module';
import { SpellModule } from './spell/spell.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { Champion } from './entities/champion.entity';
import { ItemEntity } from './entities/item.entity';
import { SpellEntity } from './entities/spell.entity';
import { ChampItemEntity } from './entities/champ_item.entity';
import { ChampSkillEntity } from './entities/champ_skill.entity';
import { ChampionWinEntity } from './entities/champion_win.entity';
import { RuneMainEntity } from './entities/rune_main.entity';
import { RuneStatEntity } from './entities/rune_stat.entity';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [
    ConfigModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 3,
      }),
    }),
    TypeOrmModule.forFeature([
      Champion,
      ItemEntity,
      SpellEntity,
      ChampItemEntity,
      ChampSkillEntity,
      ChampionWinEntity,
      RuneMainEntity,
      RuneStatEntity,
    ]),
    ChampionsModule,
    RuneModule,
    SkillModule,
    SpellModule,
    ItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
