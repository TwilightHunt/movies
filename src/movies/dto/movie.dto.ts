import { IsNumberString, IsString } from 'class-validator';

export class MovieDto {
  @IsString({ message: 'title must be string' })
  readonly title: string;

  @IsString({ message: 'description must be string' })
  readonly description: string;

  @IsNumberString({}, { message: 'rate must be a number' })
  readonly rate: number;
}
