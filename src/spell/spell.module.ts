import { Module } from '@nestjs/common';
import { SpellService } from './spell.service';
import { SpellController } from './spell.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpellEntity } from 'src/entities/spell.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SpellEntity])],
  providers: [SpellService],
  controllers: [SpellController],
  exports: [SpellService],
})
export class SpellModule {}
