import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../database/main';
import * as Services from './services';
import * as Controllers from './controllers';

const services = Object.values(Services).flat();
const controllers = Object.values(Controllers).flat();

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], 'main')],
  providers: [...services],
  controllers: [...controllers],
  exports: [...services],
})
export class UsersModule {}
