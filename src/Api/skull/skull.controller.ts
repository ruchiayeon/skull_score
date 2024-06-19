//Libary
import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  CreateRoundDto,
  IDate,
  IGameRound,
  IGameRoundPlayerResult,
  IRoundResult,
} from '@Api/skull/skull.entity';
import { Response } from 'express';
import DatabaseService from '@Api/database/database.service';

@Controller('game/rounds')
@ApiTags('game/rounds')
export class SkullController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get()
  @ApiOperation({ summary: '게임 라운드 날짜 및 라운드 정보' })
  @ApiResponse({ status: 200, description: '정상' })
  @ApiResponse({ status: 400, description: 'Validation Error' })
  @ApiResponse({ status: 403, description: 'Fobbiden Error' })
  async get() {
    return await this.databaseService
      .query('SELECT DISTINCT date from result ORDER BY date DESC', [])
      .then((res) => {
        return this.makeMeue(res);
      });
  }
  makeMeue(dataSet: IDate[]) {
    const dataresult = [
      ...new Set(
        dataSet.map((data: IDate) => {
          const splitDate = data.date.split(' ')[0];

          return splitDate;
        }),
      ),
    ];

    const resultValue = dataresult.map((date) => {
      const roundList = [];
      dataSet.forEach((data) => {
        const splitDate = data.date.split(' ')[0];
        date === splitDate && roundList.push(splitDate);
      });

      return { game_date: date, last_round: roundList.length };
    });

    return { return_code: 0, data: resultValue };
  }

  @Post('player')
  @ApiOperation({ summary: '특정 게임 라운드 player 정보 ' })
  @ApiResponse({ status: 201, description: '정상' })
  @ApiResponse({ status: 400, description: 'Validation Error' })
  @ApiResponse({ status: 403, description: 'Fobbiden Error' })
  async createPlayer(
    @Body() createCatDto: CreateRoundDto,
    @Res() res: Response,
  ) {
    const gameDateList = await this.databaseService
      .query(
        `SELECT DISTINCT date from result WHERE date LIKE '%${createCatDto.game_date}%' ORDER BY date DESC`,
        [],
      )
      .then((res) => {
        return res.map((data: IDate, index: number) => {
          return { game_date: data.date, round: index + 1 };
        });
      });

    //비정상적인 round 제공시
    //비정상적인 라운드 제공시
    if (gameDateList[createCatDto.round - 1] === undefined) {
      return res
        .status(res.statusCode)
        .send(Object.assign({ return_code: -1 }, { data: '' }));
    }

    const gameRoundResult = await this.databaseService
      .query(
        `SELECT * from result WHERE date LIKE '%${gameDateList[createCatDto.round - 1].game_date}%' ORDER BY play_index ASC`,
        [],
      )
      .then((res) => {
        return res.map((data: IGameRound) => {
          return {
            player: data.name,
            isWinner: data.rank === 1 ? 'Y' : 'N',
            rank: data.rank,
            resultScore: data.result_point,
          };
        });
      });
    const isRequestSuccessful = res.statusCode >= 200 && res.statusCode < 300;

    return res
      .status(res.statusCode)
      .send(
        Object.assign(
          { return_code: isRequestSuccessful ? 0 : res.statusCode },
          { data: gameRoundResult },
        ),
      );
  }

  @Post('score')
  @ApiOperation({ summary: '특정 게임 라운드 score 정보 ' })
  @ApiResponse({ status: 201, description: '정상' })
  @ApiResponse({ status: 400, description: 'Validation Error' })
  @ApiResponse({ status: 403, description: 'Fobbiden Error' })
  async createScore(
    @Body() createCatDto: CreateRoundDto,
    @Res() res: Response,
  ) {
    const gameDateList = await this.databaseService
      .query(
        `SELECT DISTINCT date from result WHERE date LIKE '%${createCatDto.game_date}%' ORDER BY date DESC`,
        [],
      )
      .then((res) => {
        return res.map((data: IDate, index: number) => {
          return { game_date: data.date, round: index + 1 };
        });
      });

    //비정상적인 라운드 제공시
    if (gameDateList[createCatDto.round - 1] === undefined) {
      return res
        .status(res.statusCode)
        .send(Object.assign({ return_code: -1 }, { data: '' }));
    }

    const gameRoundPlayer = await this.databaseService
      .query(
        `SELECT * from result WHERE date LIKE '%${gameDateList[createCatDto.round - 1].game_date}%' ORDER BY play_index ASC`,
        [],
      )
      .then((res) => {
        return res.map((data: IGameRound) => {
          return {
            player: data.name,
            resultScore: data.result_point,
            score: [],
          };
        });
      });

    const gameRoundResult = await this.databaseService
      .query(
        `SELECT * from round WHERE date LIKE '%${gameDateList[createCatDto.round - 1].game_date}%' ORDER BY round ASC`,
        [],
      )
      .then((res) => {
        return res;
      });

    gameRoundPlayer.map((data: IGameRoundPlayerResult) => {
      gameRoundResult.map((result: IRoundResult) => {
        const roundScore =
          result.round_before === result.round_after
            ? result.round_after === 0
              ? result.round * 10
              : result.round_after * 20
            : result.round_before === 0
              ? -result.round * 10
              : Math.sign(result.round_before - result.round_after) === -1
                ? (result.round_before - result.round_after) * 10
                : (result.round_before - result.round_after) * -10;

        const addBonus =
          Math.sign(roundScore) !== -1
            ? roundScore + result.round_bonus
            : roundScore;

        return (
          result.name === data.player &&
          data.score.push({
            round: result.round,
            score: addBonus,
            round_before: result.round_before,
            round_after: result.round_after,
            round_bonus: result.round_bonus,
          })
        );
      });
    });

    const isRequestSuccessful = res.statusCode >= 200 && res.statusCode < 300;

    return res
      .status(res.statusCode)
      .send(
        Object.assign(
          { return_code: isRequestSuccessful ? 0 : res.statusCode },
          { data: gameRoundPlayer },
        ),
      );
  }
}
