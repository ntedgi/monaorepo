import { Injectable} from '@nestjs/common';

@Injectable()
export class TemplateService {
  constructor() { }
  sayHi() {
    return "HI!"
  }
}
