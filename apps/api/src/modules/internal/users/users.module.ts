import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas';
import { UsersService } from './services';
import { UsersController } from './controllers';
import { UsersRepository } from './repositories';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], 'main')],
  providers: [UsersService, UsersRepository],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
