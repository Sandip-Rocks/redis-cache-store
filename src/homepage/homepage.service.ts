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
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class HomepageService {
  private readonly logger = new Logger(HomepageService.name);
  private snapshotpath = path.join(
    process.cwd(),
    'src/homepage/snapshot/homepage_snapshot.json',
  );

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getHomepage(): Promise<HomepageResponseDto> {
    this.logger.log(this.getHomepage.name);
    try {
      const res = await fetch(HOMEPAGE_API_URL);
      const data: HomepageDataDto[] = await res.json();
      // cache in redis
      await this.cacheManager.set('homepage_data', data);
      // update in snapshot
      const snapshotDir = path.dirname(this.snapshotpath);
      if (!fs.existsSync(snapshotDir)) {
        fs.mkdirSync(snapshotDir, { recursive: true });
        this.logger.log(`Created snapshot directory: ${snapshotDir}`);
      }
      fs.writeFileSync(
        this.snapshotpath,
        JSON.stringify(mapResponseToHomepageResponseDto(data), null, 2),
      );
      this.logger.log('Fetched data from API and cached it + snapshot updated');

      return mapResponseToHomepageResponseDto(data);
    } catch (error) {
      this.logger.error(this.getHomepage.name, error);
      if (fs.existsSync(this.snapshotpath)) {
        const snapshotData: HomepageDataDto[] = JSON.parse(
          fs.readFileSync(this.snapshotpath, 'utf-8'),
        );
        this.logger.warn(
          'Using snapshot data due to API fetch failure',
          this.getHomepage.name,
        );
        return snapshotData as unknown as HomepageResponseDto;
      }
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
