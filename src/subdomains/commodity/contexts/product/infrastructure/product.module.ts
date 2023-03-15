import { Module } from '@nestjs/common';
import { PostgresSQLModule } from './persistence/database/postgres/postgres.module';
@Module({
  imports: [PostgresSQLModule],
  controllers: [],
  providers: [],
})
export class ProductModule {}
