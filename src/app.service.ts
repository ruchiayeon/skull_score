import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getData(): string {
    return '데이터를 보내줍니다.';
  }
}
