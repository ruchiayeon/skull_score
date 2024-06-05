import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from 'app.module';
import { setupSwagger } from '@Utils/swagger';

async function Main() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  //Cors 설정
  app.enableCors({
    origin: true,
    credentials: true,
    // exposedHeaders: ['Authorization'], // * 사용할 헤더 추가.
  });
  setupSwagger(app);
  return await app.listen(3000);
}

Main();
