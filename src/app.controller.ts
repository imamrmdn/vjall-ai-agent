import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EstimateExchangeParams } from './models/Mix';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Get('/minExchange')
  async getMinExchangeAmount() {
    return await this.appService.getMinExchangeAmount();
  }

  @Get('/estimateExchange')
  async getEstimateExchange(params: EstimateExchangeParams) {
    return await this.appService.getEstimateExchange(params);
  }
}
