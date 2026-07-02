import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import mongoose from 'mongoose';

import { Gym, GymDocument } from './schemas/gym.schema';

@Injectable()
export class GymService {
  constructor(
    @InjectModel(Gym.name)
    private gymModel: Model<GymDocument>,
  ) {}

  async findAll() {
    return this.gymModel.find();
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException(
        'Invalid Member ID',
      );
    }

    const member = await this.gymModel.findById(id);

    if (!member) {
      throw new NotFoundException(
        'Member not found',
      );
    }

    return member;
  }

  async create(member: any) {
    const newMember = new this.gymModel(member);
    return newMember.save();
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
      await this.gymModel.findByIdAndDelete(id);

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