import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  User,
  UserDocument,
} from '../users/schemas/user.schema';

import {
  Gym,
  GymDocument,
} from '../gym/schemas/gym.schema';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,

    @InjectModel(Gym.name)
    private readonly gymModel: Model<GymDocument>,
  ) {}

  // Dashboard Analytics
  async getDashboard() {
    const totalUsers = await this.userModel.countDocuments();

    const totalMembers = await this.userModel.countDocuments({
      role: 'member',
    });

    const totalAdmins = await this.userModel.countDocuments({
      role: 'admin',
    });

    const totalGymRecords =
      await this.gymModel.countDocuments();

    return {
      totalUsers,
      totalMembers,
      totalAdmins,
      totalGymRecords,
    };
  }

  // Membership Report using $group
  async getMembershipReport() {
    return this.gymModel.aggregate([
      {
        $group: {
          _id: '$membership',
          totalMembers: {
            $sum: 1,
          },
        },
      },
    ]);
  }

  // Average Age using $avg
  async getAverageAge() {
    return this.gymModel.aggregate([
      {
        $group: {
          _id: null,
          averageAge: {
            $avg: '$age',
          },
        },
      },
    ]);
  }

  // Adult Members using $match
  async getAdultMembers() {
    return this.gymModel.aggregate([
      {
        $match: {
          age: {
            $gte: 18,
          },
        },
      },
    ]);
  }

  // Gym + User Details using $lookup
  async getGymUsers() {
    return this.gymModel.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $project: {
          name: 1,
          age: 1,
          membership: 1,
          user: {
            name: 1,
            email: 1,
            role: 1,
          },
        },
      },
    ]);
  }
}