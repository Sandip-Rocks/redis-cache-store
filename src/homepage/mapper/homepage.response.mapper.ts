import { HomepageDataDto, HomepageResponseDto } from '../dto';

export const mapResponseToHomepageResponseDto = (
  data: HomepageDataDto[],
): HomepageResponseDto => {
  return {
    data: data.map((item: HomepageDataDto) => ({
      userId: item.userId,
      id: item.id,
      title: item.title,
      body: item.body,
    })),
    success: true,
    message: 'Homepage data fetched successfully',
  };
};
