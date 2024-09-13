import { Controller, Get, Post, Body, Patch, Param, Inject, ParseUUIDPipe, Query } from '@nestjs/common';
import { ORDERS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateOrderDto, PaginationOrderDto, StatusDto } from './dto';
import { PaginationDto } from 'src/common';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(ORDERS_SERVICE) private readonly ordersClient: ClientProxy) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    try {
      return await firstValueFrom(this.ordersClient.send({ cmd: 'create-order' }, { ...createOrderDto }));
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
  async findAll(@Query() paginationDto: PaginationOrderDto) {
    try {
      return await firstValueFrom(this.ordersClient.send({ cmd: 'find-all-orders' }, { ...paginationDto }));
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get('id/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await firstValueFrom(this.ordersClient.send({ cmd: 'find-one-order' }, { id }));
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(':status')
  async findAllByStatus(@Param() statusDto: StatusDto, @Query() paginationDto: PaginationDto) {
    try {
      return await firstValueFrom(
        this.ordersClient.send({ cmd: 'find-all-orders' }, { ...paginationDto, status: statusDto.status }),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  changeState(@Param('id', ParseUUIDPipe) id: string, @Body() statusDto: StatusDto) {
    try {
      return this.ordersClient.send({ cmd: 'change-order-state' }, { status: statusDto.status, id });
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
