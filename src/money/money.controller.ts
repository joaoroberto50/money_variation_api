import { Controller, Get, Param } from '@nestjs/common';
import { MoneyService } from './money.service';

@Controller('money')
export class MoneyController {
  constructor(private readonly MoneyService: MoneyService) {}

  @Get()
  findAll() {
    return this.MoneyService.values;
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.MoneyService.findOne(name);
  }
}
