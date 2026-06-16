import { IsNumber, IsString } from 'class-validator';

export class CreateGymDto {
  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsString()
 membership: string;
}