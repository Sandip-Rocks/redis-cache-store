import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { HomepageDataDto, HomepageResponseDto } from './dto';
import { HOMEPAGE_API_URL } from './constant';
import { mapResponseToHomepageResponseDto } from './mapper';

@Injectable()
export class HomepageService {
  private readonly logger = new Logger(HomepageService.name);

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getHomepage(): Promise<HomepageResponseDto> {
    this.logger.log(this.getHomepage.name);
    try {
      const res = await fetch(HOMEPAGE_API_URL);
      const data: HomepageDataDto[] = await res.json();
      await this.cacheManager.set('homepage_data', data);
      this.logger.log('Fetched data from API and cached it');
      return mapResponseToHomepageResponseDto(data);
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
