import { Controller, Get, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('RootEntryPoint')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiResponse({ status: HttpStatus.OK })
  @ApiOperation({ summary: "Returns initial application information." })
  getHello() {
    return {
      statusStatus: HttpStatus.OK,
      data: this.appService.getHello(),
    };
  }
}
