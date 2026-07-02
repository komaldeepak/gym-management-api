import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import mongoose from 'mongoose';

import {
  Gym,
  GymDocument,
} from './schemas/gym.schema';
import { QueryGymDto } from './dto/query-gym.dto';

@Injectable()
export class GymService {
  constructor(
    @InjectModel(Gym.name)
    private gymModel: Model<GymDocument>,
  ) {}

  async findAll(query: QueryGymDto) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;

    const skip = (page - 1) * limit;

    const filter: any = {};

    if (query.name) {
      filter.name = {
        $regex: query.name,
        $options: 'i',
      };
    }

    if (query.membership) {
      filter.membership = query.membership;
    }

    if (query.age) {
      filter.age = Number(query.age);
    }

    // Default sorting: newest first
    const sort = query.sort || '-createdAt';

    const members = await this.gymModel
      .find(filter)
      .select('name age membership createdAt')
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    const total =
      await this.gymModel.countDocuments(filter);

    return {
      members,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(
          total / limit,
        ),
      },
    };
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException(
        'Invalid Member ID',
      );
    }

    const member =
      await this.gymModel.findById(id);

    if (!member) {
      throw new NotFoundException(
        'Member not found',
      );
    }

    return member;
  }

  async create(member: any) {
    console.log('Received member:', member);

    const newMember = new this.gymModel(member);

    console.log('Created model:', newMember);

    return await newMember.save();
  }

  async update(id: string, member: any) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException(
        'Invalid Member ID',
      );
    }

    const updatedMember =
      await this.gymModel.findByIdAndUpdate(
        id,
        member,
        {
          new: true,
        },
      );

    if (!updatedMember) {
      throw new NotFoundException(
        'Member not found',
      );
    }

    return updatedMember;
  }

  async delete(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException(
        'Invalid Member ID',
      );
    }

    const deletedMember =
      await this.gymModel.findByIdAndDelete(
        id,
      );

    if (!deletedMember) {
      throw new NotFoundException(
        'Member not found',
      );
    }

    return {
      success: true,
      message: 'Member deleted successfully',
      data: deletedMember,
    };
  }
}