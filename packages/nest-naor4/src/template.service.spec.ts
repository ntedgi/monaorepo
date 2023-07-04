import { TemplateService } from './template.service';

describe('TemplateService', () => {
  let templateService = TemplateService();
  it('should say HI', async () => {
    expect(templateService.sayHi()).toEqual("HI!");
  })
});
