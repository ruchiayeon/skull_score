import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { SkullController } from '@Api/skull/skull.controller';
import { SkullService } from '@Api/skull/skull.service';
import DatabaseService from '@Api/database/database.service';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   // ----------------- 추가 start
    //   type: 'sqlite', // - DB 종류
    //   database: 'crud_1.db', // - DB 파일 이름
    //   autoLoadEntities: true, // - 구동시 entity파일 자동 로드
    //   synchronize: true, // - 서비스 구동시 entity와 디비의 테이블 싱크 개발만 할것
    //   logging: true, // - orm 사용시 로그 남기기
    //   dropSchema: true, // - 구동시 해당 테이블 삭제 synchronize와 동시 사용
    // }), // ----------------- 추가 end
  ],

  controllers: [SkullController],
  providers: [SkullService, DatabaseService],
})
export class AppModule {}
