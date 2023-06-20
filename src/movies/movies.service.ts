import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Movie, MovieDocument } from './movie.schema';
import { MovieDto } from './dto/movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie.name)
    private movieModel: Model<MovieDocument>,
  ) {}

  async create(movieDto: MovieDto): Promise<MovieDocument> {
    if (!movieDto.title || !movieDto.description) {
      throw new BadRequestException('Title or description are not provided');
    }

    const newMovie = new this.movieModel(movieDto);
    return newMovie.save();
  }

  async getAllMovies(): Promise<MovieDocument[]> {
    const movies = await this.movieModel.find();
    return movies;
  }

  async getMovieById(movieId: string): Promise<MovieDocument> {
    try {
      const movie = await this.movieModel.findById(movieId);
      return movie;
    } catch (error) {
      throw new BadRequestException('Cannot find movie with specified id');
    }
  }

  async update(
    movieId: string,
    newData: MovieDocument,
  ): Promise<MovieDocument> {
    try {
      const movie = await this.movieModel.findByIdAndUpdate(
        movieId,
        { ...newData },
        { new: true },
      );
      return movie;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async delete(movieId: string) {
    await this.movieModel.findByIdAndDelete(movieId);
  }
}
