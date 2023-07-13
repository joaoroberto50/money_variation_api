import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MoneyService } from './money.service';
import { CreateVariationDto } from './dto/create-variation.dto';
import { UpdateVariationDto } from './dto/update-variation.dto';

@Controller('money')
export class MoneyController {
  constructor(private readonly MoneyService: MoneyService) {}

  @Post()
  create(@Body() createVariationDto: CreateVariationDto) {
    return this.MoneyService.num;
  }

  @Get()
  findAll() {
    return this.MoneyService.values;
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.MoneyService.findOne(name);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVariationDto: UpdateVariationDto) {
    return this.MoneyService.num;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.MoneyService.remove(+id);
  }
}
