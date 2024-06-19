import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';

@Injectable()
export class DownloadService {
  async downloadFile() {
    const filePath = path.join('src', 'Public', 'skullking.db');

    try {
      console.log(filePath);

      if (fs.existsSync(filePath)) {
        // 파일 삭제
        fs.unlinkSync(filePath);
        console.log(`파일 ${filePath} 삭제 완료`);
      }

      const response = await axios.get('https://skulldb.shop/skullking.db', {
        responseType: 'arraybuffer',
      });
      const downloadedData = Buffer.from(response.data, 'binary');

      // 예시: 다운로드한 데이터를 파일로 저장할 수도 있음

      fs.writeFileSync(filePath, downloadedData);

      return;
    } catch (error) {
      console.error('Error downloading file:', error.message);
      fs.unlinkSync(filePath);
    }
  }
}
