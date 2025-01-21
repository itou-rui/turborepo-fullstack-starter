import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../database';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
	imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], 'main')],
	providers: [UsersService],
	controllers: [UsersController],
	exports: [UsersService],
})
export class UsersModule {}
