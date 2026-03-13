import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from '@nestjs/cache-manager';
import { HomepageModule } from './homepage/homepage.module';
import { redisStore } from 'cache-manager-redis-store';
import { ConfigService } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ConfigModuleCustom } from './config/config.module';

@Module({
  imports: [
    ConfigModuleCustom,
    CacheModule.registerAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const redisConfig = configService.get('redis');
        return {
          store: redisStore,
          host: redisConfig.host,
          port: redisConfig.port,
          ttl: 300,
        };
      },
    }),
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config = configService.get('throllers');
        return [
          {
            name: config.short.name,
            ttl: config.short.ttl,
            limit: config.short.limit,
          },
          {
            name: config.medium.name,
            ttl: config.medium.ttl,
            limit: config.medium.limit,
          },
          {
            name: config.long.name,
            ttl: config.long.ttl,
            limit: config.long.limit,
          },
        ];
      },
    }),
    HomepageModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_GUARD',
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
