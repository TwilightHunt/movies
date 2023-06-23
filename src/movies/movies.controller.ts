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
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MovieDto } from './dto/movie.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get()
  async getMovies() {
    try {
      const movies = await this.moviesService.getAllMovies();
      return movies;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Post()
  async addNewMovie(
    @Body() movieDto: MovieDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const movie = await this.moviesService.create(movieDto, file);
      return { movie };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('/:id')
  async getMovieById(@Param() param) {
    try {
      const movie = await this.moviesService.getMovieById(param.id);
      return { movie };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Put('/:id')
  async updateMovie(
    @Param() param,
    @Body() body,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const movie = await this.moviesService.update(param.id, body, file);
      return { movie };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteMovie(@Param() param) {
    try {
      await this.moviesService.delete(param.id);
      const movies = await this.moviesService.getAllMovies();
      return movies;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
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
