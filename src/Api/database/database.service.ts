import { Injectable } from '@nestjs/common';
import * as sqlite3 from 'sqlite3';

@Injectable()
export default class DatabaseService {
  private db: sqlite3.Database;

  constructor() {
    //상대경로로 하면 db파일을 dist로 옮기면서 내용이 유실됨
    this.db = new sqlite3.Database('src/DataBase/skullking.db', (err) => {
      if (err) {
        console.error('Error opening database:', err);
      } else {
        console.log('Connected to the SQLite database.');
      }
    });
  }

  query(sql: string, params: any[]): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  close(): void {
    this.db.close((err) => {
      if (err) {
        console.error('Error closing database:', err);
      } else {
        console.log('Disconnected from the SQLite database.');
      }
    });
  }
}
