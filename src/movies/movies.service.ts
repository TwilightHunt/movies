import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Movie, MovieDocument } from './movie.schema';
import { MovieDto } from './dto/movie.dto';
import { FilesService } from 'src/files/files.service';

type SortingMethod = 'rate' | 'title' | 'year';
type SortingDirection = 1 | -1;

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie.name)
    private movieModel: Model<MovieDocument>,
    private fileService: FilesService,
  ) {}

  async create(movieDto: MovieDto, image): Promise<MovieDocument> {
    if (!movieDto.title || !movieDto.description) {
      throw new BadRequestException('Title or description are not provided');
    }

    const fileName = await this.fileService.createFile(image);
    const newMovie = new this.movieModel({ ...movieDto, image: fileName });

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
    image: any,
  ): Promise<MovieDocument> {
    try {
      if (image) {
        let fileName = await this.fileService.createFile(image);
        newData.image = fileName;
      }
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

  async sort(method: SortingMethod, direction: SortingDirection) {
    if (method === 'rate') {
      const movies = await this.movieModel.find().sort({ rate: direction });
      return movies;
    } else {
      throw new BadRequestException('Invalid sorting method');
    }
  }
}
