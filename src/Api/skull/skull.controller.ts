import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Res,
  Param,
} from '@nestjs/common';
import { CreateCatDto } from '@Api/skull/skull.entity';
import { Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import DatabaseService from '@Api/database/database.service';

@Controller('test')
@ApiTags('test')
export class SkullController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get(':id')
  @ApiOperation({ summary: '전체 통계 데이터 받기' })
  @ApiResponse({ status: 200, description: '정상' })
  @ApiResponse({ status: 400, description: 'Validation Error' })
  @ApiResponse({ status: 403, description: 'Fobbiden Error' })
  async get(@Param('id') id: string) {
    console.log(this.databaseService);
    const data = await this.databaseService.query(
      'SELECT name FROM result',
      [],
    );
    console.log(JSON.stringify(data));
    return id;
  }

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
}
