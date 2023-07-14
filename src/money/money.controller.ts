import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { MoneyService } from './money.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('money')
@Controller('money')
export class MoneyController {
  constructor(private readonly MoneyService: MoneyService) {}

  @Get()
  @ApiResponse({ status: HttpStatus.OK })
  @ApiOperation({ summary: "Returns all currencies with updated values." })
  findAll() {
    return {
      statusCode: HttpStatus.OK,
      data: this.MoneyService.values,
    }
  }

  @ApiTags('money/{name}')
  @Get(':name')
  @ApiResponse({ status: HttpStatus.OK })
  @ApiOperation({ summary: "Returns the updated value of a specific currency." })
  findOne(@Param('name') name: string) {
    return {
      statusCode: HttpStatus.OK,
      data: this.MoneyService.findOne(name),
    };
  }
}
