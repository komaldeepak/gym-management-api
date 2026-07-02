import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsInt,
  IsMongoId,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateGymDto {
  @ApiProperty({
    example: 'Rahul',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 22,
  })
  @Type(() => Number)
  @IsInt()
  age: number;

  @ApiProperty({
    example: 'Silver',
  })
  @IsString()
  membership: string;

  @ApiProperty({
    example: '6864b8b5b91c3d1234567890',
    description: 'User ObjectId',
  })
  @IsMongoId()
  userId: string;
}