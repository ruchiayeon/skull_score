import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import sqlite3 from 'sqlite3';

@Controller('/test')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  getHello(): string {
    // open the database
    const dbPath: string = 'path/to/your/database.db';
    // SQLite 데이터베이스 연결
    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Connected to the SQLite database.');
    });

    const sql = `SELECT * FROM student
               WHERE name = '이종현'`;

    db.serialize(() => {
      db.each(sql, (err, row) => {
        if (err) {
          console.error(err.message);
        }
        console.log(row); // row에는 검색된 각 레코드의 데이터가 포함됩니다.
      });
    });

    db.close((err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Close the SQLite database connection.');
    });

    // close the database connection
    db.close();

    return this.appService.getHello();
  }

  @Post()
  @Get()
  getData(): string {
    return this.appService.getData();
  }
}
