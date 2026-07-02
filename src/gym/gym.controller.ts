import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

import { GymService } from './gym.service';
import { CreateGymDto } from './dto/create-gym.dto';
import { QueryGymDto } from './dto/query-gym.dto';

@ApiTags('Gym')
@Controller('gym')
export class GymController {
  constructor(
    private readonly gymService: GymService,
  ) {}

  @ApiOperation({
    summary: 'Get all gym members',
  })
  @ApiResponse({
    status: 200,
    description:
      'Gym members fetched successfully',
  })
  @Get()
  async getAllMembers(
    @Query() query: QueryGymDto,
  ) {
    return {
      success: true,
      message:
        'Gym members fetched successfully',
      data: await this.gymService.findAll(
        query,
      ),
    };
  }

  @ApiOperation({
    summary: 'Get member by ID',
  })
  @ApiResponse({
    status: 200,
    description:
      'Gym member fetched successfully',
  })
  @Get(':id')
  async getMember(
    @Param('id') id: string,
  ) {
    return {
      success: true,
      message:
        'Gym member fetched successfully',
      data: await this.gymService.findOne(id),
    };
  }

  @ApiOperation({
    summary: 'Create a new gym member',
  })
  @ApiResponse({
    status: 201,
    description:
      'Gym member created successfully',
  })
  @Post()
  async createMember(
    @Body() createGymDto: CreateGymDto,
  ) {
    return await this.gymService.create(
      createGymDto,
    );
  }

  @ApiOperation({
    summary: 'Update a gym member',
  })
  @ApiResponse({
    status: 200,
    description:
      'Gym member updated successfully',
  })
  @Put(':id')
  async updateMember(
    @Param('id') id: string,
    @Body() updateData: any,
  ) {
    return await this.gymService.update(
      id,
      updateData,
    );
  }

  @ApiOperation({
    summary: 'Delete a gym member',
  })
  @ApiResponse({
    status: 200,
    description:
      'Gym member deleted successfully',
  })
  @Delete(':id')
  async deleteMember(
    @Param('id') id: string,
  ) {
    return await this.gymService.delete(id);
  }
}