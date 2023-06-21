import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MovieDocument = Movie & Document;

@Schema()
export class Movie {
  @Prop({ required: true, unique: true })
  title: String;

  @Prop({ required: true })
  description: String;

  @Prop({ required: true })
  rate: Number;
}

export const MovieShema = SchemaFactory.createForClass(Movie);
