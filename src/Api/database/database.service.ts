import { Injectable } from '@nestjs/common';
import * as sqlite3 from 'sqlite3';
import * as fs from 'fs';
import * as path from 'path';
import { DownloadService } from '@Api/database/downloadDb';

@Injectable()
export default class DatabaseService {
  private db: sqlite3.Database;

  constructor() {
    this.connected();
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

  async connected() {
    return await new DownloadService()
      .downloadFile()
      .catch(() => {
        setTimeout(() => {
          return this.connected();
        }, 60000);
      })
      .finally(() => {
        //상대경로로 하면 db파일을 dist로 옮기면서 내용이 유실됨
        return (this.db = new sqlite3.Database(
          'src/public/skullking.db',
          (err) => {
            if (err) {
              console.error('Error opening database:', err);
              setTimeout(() => {
                return this.connected();
              }, 60000);
            } else {
              console.log('Connected to the SQLite database.');
            }
          },
        ));
      });
  }

  close(): void {
    this.db.close((err) => {
      if (err) {
        console.error('Error closing database:', err);
      } else {
        const filePath = path.join('src', 'public', 'skullking.db');
        fs.unlinkSync(filePath);
        console.log('Disconnected from the SQLite database.');
      }

      this.connected();
    });
  }
}
