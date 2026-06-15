import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { GymService } from './gym.service';

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
  createMember(@Body() body: any) {

    console.log(body);

    return this.gymService.create(body);

  }

}