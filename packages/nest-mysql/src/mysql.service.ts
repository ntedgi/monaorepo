import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MysqlService {
  constructor(
    @Inject(ConfigService)
    public config: ConfigService,
  ) {
    const {host,password,user,database} = config.get('mysql')
    console.log('MysqlService constructor');
   }
  sayHi() {
    return "HI!"
  }
}
