import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { HomepageService } from './homepage.service';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@UseInterceptors(CacheInterceptor)
@Controller('homepage')
export class HomepageController {
  constructor(private readonly homepageService: HomepageService) {}

  @CacheKey('homepage_data')
  @CacheTTL(0)
  @Get()
  async getHomepage(): Promise<any> {
    return this.homepageService.getHomepage();
  }
}
