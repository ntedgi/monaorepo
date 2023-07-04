import { TemplateService } from './mysql.service';

describe('TemplateService', () => {
  let templateService = new TemplateService();
  it('should say HI', async () => {
    expect(templateService.sayHi()).toEqual("HI!");
  })
});
