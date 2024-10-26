import { Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class ChampSearchDto {
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  champ_id: number;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  vs_champ_id: number;
}
