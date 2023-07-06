import { Test, TestingModule } from '@nestjs/testing';
import {TemplateService} from './template.service';

describe('LoggerService', () => {
  let templateService: TemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TemplateService],
    }).compile();

    templateService = module.get<TemplateService>(TemplateService);
  });

  it('should say hi', () => {
    expect(templateService.sayHi()).toEqual("HI!");
  });
});
