import { Injectable } from '@nestjs/common';

@Injectable()
export class GymService {

  private gyms = [
    {
      id: 1,
      name: "Khushi",
      membership: "Gold"
    },
    {
      id: 2,
      name: "Aman",
      membership: "Silver"
    }
  ];

  findAll() {
    return this.gyms;
  }

  create(member: any) {
    this.gyms.push(member);

    return {
      message: "Member added successfully",
      data: member
    };
  }

}