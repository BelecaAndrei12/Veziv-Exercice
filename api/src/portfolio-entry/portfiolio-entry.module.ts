import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { PortfolioEntryEntity } from './models/portfolio-entry.entity';
import { PortfolioEntryController } from './portfolio-entry.controller';
import { PortfolioService } from './portfolio-entry.service';
import { UserService } from 'src/user/user.service';
import { UserEntity } from 'src/user/model/user.entity';
import { PasswordManagerService } from 'src/auth/passwd.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PortfolioEntryEntity,UserEntity]),
    AuthModule,
],
  controllers: [PortfolioEntryController],
  providers: [
    PortfolioService,
    UserService,
    PasswordManagerService
  ],
  exports: [PortfolioService],
})
export class PortfolioEntryModule {}