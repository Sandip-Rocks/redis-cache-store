export interface AppConfig {
  redis: {
    host: string;
    port: number;
  };
  app: {
    port: number;
    nodeEnv: string;
  };
  throllers: {
    short: {
      name: string;
      ttl: number;
      limit: number;
    };
    medium: {
      name: string;
      ttl: number;
      limit: number;
    };
    long: {
      name: string;
      ttl: number;
      limit: number;
    };
  };
}
