import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Session, SessionSchema } from '../../database/main';
import { SessionService } from './session.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }], 'main')],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
