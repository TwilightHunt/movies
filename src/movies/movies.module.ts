import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieShema } from './movie.schema';
import { FilesModule } from 'src/files/files.module';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService],
  imports: [
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieShema }]),
    FilesModule,
  ],
})
export class MoviesModule {}
