import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class HealthCheckController {
  @Get()
  async healthCheck() {
    return 'Client gateway is running!!';
  }
}
