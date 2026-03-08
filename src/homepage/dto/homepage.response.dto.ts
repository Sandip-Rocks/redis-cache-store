export interface HomepageDataDto {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export class HomepageResponseDto {
  data: HomepageDataDto[];
  success: boolean;
  message: string;
}
