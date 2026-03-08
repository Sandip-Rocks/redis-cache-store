import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from '@nestjs/cache-manager';
import { HomepageModule } from './homepage/homepage.module';
import { redisStore } from 'cache-manager-redis-store';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get<string>('REDIS_HOST', '127.0.0.1'),
        port: configService.get<number>('REDIS_PORT', 6379),
        ttl: 300,
      }),
      inject: [ConfigService],
    }),
    HomepageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
