import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [],
  providers: [UsersService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
