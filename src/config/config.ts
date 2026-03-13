import { AppConfig } from './interface/app-config.interface';

export const config = (): AppConfig => ({
  redis: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
  },
  app: {
    port: parseInt(process.env.PORT || '3000', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
  },
  throllers: {
    short: {
      name: process.env.SHORT_THROTTLE_NAME || 'short',
      ttl: parseInt(process.env.SHORT_THROTTLE_TTL || '1000', 10),
      limit: parseInt(process.env.SHORT_THROTTLE_LIMIT || '3', 10),
    },
    medium: {
      name: process.env.MEDIUM_THROTTLE_NAME || 'medium',
      ttl: parseInt(process.env.MEDIUM_THROTTLE_TTL || '10000', 10),
      limit: parseInt(process.env.MEDIUM_THROTTLE_LIMIT || '20', 10),
    },
    long: {
      name: process.env.LONG_THROTTLE_NAME || 'long',
      ttl: parseInt(process.env.LONG_THROTTLE_TTL || '60000', 10),
      limit: parseInt(process.env.LONG_THROTTLE_LIMIT || '100', 10),
    },
  },
});
