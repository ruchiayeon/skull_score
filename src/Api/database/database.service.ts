import { Injectable } from '@nestjs/common';
import * as sqlite3 from 'sqlite3';
import * as fs from 'fs';
import * as path from 'path';
import { DownloadService } from '@Api/database/downloadDb';

@Injectable()
export default class DatabaseService {
  private db: sqlite3.Database;

  constructor() {
    new DownloadService().downloadFile().finally(() => {
      //상대경로로 하면 db파일을 dist로 옮기면서 내용이 유실됨
      this.db = new sqlite3.Database('src/Public/skullking.db', (err) => {
        if (err) {
          console.error('Error opening database:', err);
        } else {
          console.log('Connected to the SQLite database.');
        }
      });
    });
  }

  async addBinaryData(data: Buffer): Promise<number> {
    return new Promise((resolve, reject) => {
      // 데이터베이스에 바이너리 데이터 추가
      this.db.run(
        `INSERT INTO files (data) VALUES (?);`,
        [data],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(this.lastID); // 삽입된 데이터의 ID 반환
          }
        },
      );
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
        const filePath = path.join(__dirname, 'Public', 'skullking.db');
        fs.unlinkSync(filePath);
        console.log('Disconnected from the SQLite database.');
      }
    });
  }
}
