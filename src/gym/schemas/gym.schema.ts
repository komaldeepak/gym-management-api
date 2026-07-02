import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GymDocument =
  HydratedDocument<Gym>;

@Schema({
  timestamps: true,
})
export class Gym {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  age: number;

  @Prop({
    required: true,
  })
  membership: string;
}

export const GymSchema =
  SchemaFactory.createForClass(Gym);