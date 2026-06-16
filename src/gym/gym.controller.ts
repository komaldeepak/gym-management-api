import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { GymService } from './gym.service';
import { CreateGymDto } from './dto/create-gym.dto';

@Controller('gym')
export class GymController {

  constructor(private readonly gymService: GymService) {}

  @Get()
  getAllMembers() {
    return {
      success: true,
      message: "Gym members fetched successfully",
      data: this.gymService.findAll(),
    };
  }

  @Get(':id')
  getMember(@Param('id') id: string) {

    console.log(id);

    return {
      message: "Member Found",
      id: id
    };

  }

  @Post()
  createMember(@Body() createGymDto: CreateGymDto) {

    console.log(createGymDto);

    return this.gymService.create(createGymDto);

  }

}