import { Test, TestingModule } from '@nestjs/testing';
import { SkullController } from './skull.controller';

describe('SkullController', () => {
  let controller: SkullController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SkullController],
    }).compile();

    controller = module.get<SkullController>(SkullController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
