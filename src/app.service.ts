import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World and welcome to the Money Variation API. " +
    "This API handles and delivers the value of 16 " + 
    "fake coins (you can see them by going to '/money'), " +
    "the values of all coins are updated once every hour.";
  }
}
