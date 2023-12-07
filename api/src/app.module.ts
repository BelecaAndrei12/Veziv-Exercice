import { Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { PortfolioEntryModule } from './portfolio-entry/portfiolio-entry.module';
import { UserService } from './user/user.service';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    PortfolioEntryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly userService: UserService) {}

  async onModuleInit() {
    await this.userService.prepopulateDatabase();
  }


  async onModuleDestroy() {
    await this.userService.deleteUserByEmail('alex@testemail.com')
  }

}
