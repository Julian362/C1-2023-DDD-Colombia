import { Module } from '@nestjs/common';
import { PublicationController } from './controllers/publication.controller';

@Module({
  imports: [],
  controllers: [PublicationController],
  providers: [],
})
export class PublicationModule {}
