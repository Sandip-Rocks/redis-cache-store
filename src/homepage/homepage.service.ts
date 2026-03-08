import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

@Injectable()
export class HomepageService {
  private readonly logger = new Logger(HomepageService.name);

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getHomepage(): Promise<any> {
    this.logger.log(this.getHomepage.name);
    try {
      const res = await fetch(
        'https://jsonplaceholder.typicode.com/posts?_limit=5',
      );
      const data = await res.json();
      await this.cacheManager.set('homepage_data', data);
      this.logger.log('Fetched data from API and cached it');
      return data;
    } catch (error) {
      this.logger.error(this.getHomepage.name, error);
      if (error instanceof Error) {
        throw new Error(`Failed to fetch homepage data: ${error.message}`);
      }
      if (error instanceof HttpException) {
        throw new HttpException(
          `Failed to fetch homepage data: ${error.message}`,
          error.getStatus(),
        );
      }
      throw new InternalServerErrorException(
        'Something went wrong. Please try again later.',
      );
    }
  }
}
