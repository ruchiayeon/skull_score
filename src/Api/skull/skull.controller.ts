//Libary
import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
// import { CreateCatDto } from '@Api/skull/skull.entity';
// import { Response } from 'express';
import DatabaseService from '@Api/database/database.service';

@Controller('game/rounds')
@ApiTags('game/rounds')
export class SkullController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get()
  @ApiOperation({ summary: '전체 통계 데이터 받기' })
  @ApiResponse({ status: 200, description: '정상' })
  @ApiResponse({ status: 400, description: 'Validation Error' })
  @ApiResponse({ status: 403, description: 'Fobbiden Error' })
  async get() {
    const dataSet = await this.databaseService.query(
      'SELECT DISTINCT date from result ORDER BY date DESC',
      [],
    );

    await dataSet.map((data: { date: string }, index: number) => {
      const splitDate = data.date.split(' ')[0];

      //이전데이터와 동일하다면
      //roundCoutn +1
      if (index !== 0 && splitDate === dataSet[index - 1].gameDate) {
        data['gameDate'] = splitDate;
        data['round'] = dataSet[index - 1].round++;
        return;
      }

      data['gameDate'] = splitDate;
      data['round'] = 1;
      return;
    });

    return { return: 0, data: dataSet };
  }
}

/**
 * 
  @Post()
  @ApiOperation({ summary: '전체 통계 데이터 받기' })
  @ApiResponse({ status: 201, description: '정상' })
  @ApiResponse({ status: 400, description: 'Validation Error' })
  @ApiResponse({ status: 403, description: 'Fobbiden Error' })
  create(@Body() createCatDto: CreateCatDto, @Res() res: Response) {
    const isRequestSuccessful = res.statusCode >= 200 && res.statusCode < 300;

    return res
      .status(res.statusCode)
      .send(
        Object.assign(
          { return_code: isRequestSuccessful ? 0 : res.statusCode },
          { data: createCatDto },
        ),
      );
  }

  @Delete()
  @ApiOperation({ summary: '전체 통계 데이터 받기' })
  @ApiResponse({ status: 201, description: '정상' })
  @ApiResponse({ status: 400, description: 'Validation Error' })
  @ApiResponse({ status: 403, description: 'Fobbiden Error' })
  delet(@Body() createCatDto: CreateCatDto, @Res() res: Response) {
    const isRequestSuccessful = res.statusCode >= 200 && res.statusCode < 300;

    return res
      .status(res.statusCode)
      .send(
        Object.assign(
          { return_code: isRequestSuccessful ? 0 : res.statusCode },
          { data: createCatDto },
        ),
      );
  }

  @Put()
  @ApiOperation({ summary: '전체 통계 데이터 받기' })
  @ApiResponse({ status: 201, description: '정상' })
  @ApiResponse({ status: 400, description: 'Validation Error' })
  @ApiResponse({ status: 403, description: 'Fobbiden Error' })
  put(@Body() createCatDto: CreateCatDto, @Res() res: Response) {
    const isRequestSuccessful = res.statusCode >= 200 && res.statusCode < 300;

    return res
      .status(res.statusCode)
      .send(
        Object.assign(
          { return_code: isRequestSuccessful ? 0 : res.statusCode },
          { data: createCatDto },
        ),
      );
  }
 */
