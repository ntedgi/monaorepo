import { Injectable} from '@nestjs/common';

@Injectable()
export class TemplateService {
  constructor() { }
  sayHi(): string {
    return "HI!"
  }
}
