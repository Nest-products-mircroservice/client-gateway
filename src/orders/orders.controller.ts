import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, ParseIntPipe } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ORDERS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

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
  async findAll() {
    try {
      return await firstValueFrom(this.ordersClient.send({ cmd: 'find-all-orders' }, {}));
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await firstValueFrom(this.ordersClient.send({ cmd: 'find-one-order' }, { id }));
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  changeState(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    try {
      return this.ordersClient.send({ cmd: 'change-order-state' }, { ...updateOrderDto, id });
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
