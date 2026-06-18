import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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

  async create(member: any) {
    const newMember = new this.gymModel(member);
    return newMember.save();
  }

  async update(id: string, member: any) {
    return this.gymModel.findByIdAndUpdate(
      id,
      member,
      { new: true },
    );
  }

  async delete(id: string) {
    return this.gymModel.findByIdAndDelete(id);
  }
}