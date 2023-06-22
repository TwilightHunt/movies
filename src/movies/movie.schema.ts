import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MovieDocument = Movie & Document;

@Schema()
export class Movie {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true })
  description: String;

  @Prop({ required: true })
  rate: number;

  @Prop()
  image: string;
}

export const MovieShema = SchemaFactory.createForClass(Movie);
