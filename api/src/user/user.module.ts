import { Module } from '@nestjs/common';
import { UserEntity } from './model/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PasswordManagerService } from 'src/auth/passwd.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    AuthModule,
],
  controllers: [UserController],
  providers: [
    UserService,
    PasswordManagerService,
  ],
  exports: [UserService],
})
export class UserModule {}