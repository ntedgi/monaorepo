import { Module } from '@nestjs/common';
import { TemplateService } from './mysql.service';

@Module({
  imports: [],
  providers: [TemplateService],
  exports: [TemplateService],
})
export class TemplateModule {}
