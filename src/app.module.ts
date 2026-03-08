import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from '@nestjs/cache-manager';
import { HomepageModule } from './homepage/homepage.module';

@Module({
  imports: [
    CacheModule.register({
      ttl: 300000, // 5 minutes
      isGlobal: true,
    }),
    HomepageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
