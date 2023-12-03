import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { PortfolioEntryEntity } from './models/portfolio-entry.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PortfolioEntryEntity]),
    AuthModule,
],
  controllers: [],
  providers: [],
  exports: [],
})
export class PortfolioEntryModule {}