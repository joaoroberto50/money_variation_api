import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VariationService } from './variation.service';
import { CreateVariationDto } from './dto/create-variation.dto';
import { UpdateVariationDto } from './dto/update-variation.dto';

@Controller('variation')
export class VariationController {
  constructor(private readonly variationService: VariationService) {}

  @Post()
  create(@Body() createVariationDto: CreateVariationDto) {
    return this.variationService.num;
  }

  @Get()
  findAll() {
    return this.variationService.values;
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.variationService.findOne(name);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVariationDto: UpdateVariationDto) {
    return this.variationService.num;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.variationService.remove(+id);
  }
}
