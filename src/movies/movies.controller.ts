import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Delete,
  BadRequestException,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MovieDto } from './dto/movie.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get()
  async getMovies() {
    const movies = await this.moviesService.getAllMovies();
    return movies;
  }

  @UseInterceptors(FileInterceptor('image'))
  @Post()
  async addNewMovie(
    @Body() movieDto: MovieDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const movie = await this.moviesService.create(movieDto, file);
    return { movie };
  }

  @Get('/:id')
  async getMovieById(@Param() param) {
    const movie = await this.moviesService.getMovieById(param.id);
    return { movie };
  }

  @Put('/:id')
  async updateMovie(@Param() param, @Body() body) {
    const movie = await this.moviesService.update(param.id, body);
    return { movie };
  }

  @Delete('/:id')
  async deleteMovie(@Param() param) {
    await this.moviesService.delete(param.id);
    const movies = await this.moviesService.getAllMovies();
    return movies;
  }

  @Get('/sort/:method')
  async sortMovies(@Query() query, @Param() param) {
    try {
      const movies = await this.moviesService.sort(
        param.method,
        query.direction,
      );
      return movies;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
