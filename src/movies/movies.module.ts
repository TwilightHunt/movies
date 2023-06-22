import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieShema } from './movie.schema';
import { FilesModule } from 'src/files/files.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService],
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieShema }]),
    FilesModule,
  ],
})
export class MoviesModule {}
