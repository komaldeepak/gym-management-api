import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateGymDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  age?: number;

  @IsOptional()
  @IsString()
  membership?: string;
}