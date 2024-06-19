import { Entity } from 'typeorm';
import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class CreateRoundDto {
  @IsString()
  @ApiProperty({ description: '날짜', default: '', required: true })
  readonly game_date: string;

  @IsNumber()
  @ApiProperty({ description: '라운드', default: 1, required: true })
  readonly round: number;
}

export class IDate {
  date: string;
}

export class IGameRound {
  rank: number;
  name: string;
  result_point: number;
}

export class IGameRoundPlayerResult {
  player: string;
  result_score: number;
  score: IRoundResult[];
}

export class IRoundResult {
  name?: string;
  score: number;
  round: number;
  round_before: number;
  round_after: number;
  round_bonus: number;
}
