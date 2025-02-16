import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../database/main';
import { UsersService } from './services';
import { UsersController } from './controllers';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], 'main')],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
