import { ApiProperty } from '@nestjs/swagger';

export class CreateGymDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  membership: string;
}