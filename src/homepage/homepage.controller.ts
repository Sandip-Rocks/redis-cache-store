import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { HomepageService } from './homepage.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@UseInterceptors(CacheInterceptor)
@Controller('homepage')
export class HomepageController {
  constructor(private readonly homepageService: HomepageService) {}

  @Get()
  async getHomepage(): Promise<any> {
    return this.homepageService.getHomepage();
  }
}
