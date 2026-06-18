import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GymDocument = HydratedDocument<Gym>;

@Schema()
export class Gym {
  @Prop()
  name!: string;

  @Prop()
  age!: number;

  @Prop()
  membership!: string;
}

export const GymSchema = SchemaFactory.createForClass(Gym);