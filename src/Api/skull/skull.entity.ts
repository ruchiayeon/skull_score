import { Entity } from 'typeorm';
import { IsString, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class CreateCatDto {
  @IsString()
  @ApiProperty({ description: '이름', default: '', required: true })
  readonly name: string;

  @IsNumber()
  @ApiProperty({ description: '나이', default: 0, required: true })
  readonly age: number;

  @IsBoolean()
  @ApiProperty({
    description: '성별 M(fasle) |  F(true)',
    default: false,
    required: true,
  })
  readonly gender: boolean;
}
