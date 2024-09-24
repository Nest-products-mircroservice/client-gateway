import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { NATS_SERVICES } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(@Inject(NATS_SERVICES) private readonly client: ClientProxy) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    try {
      return await firstValueFrom(this.client.send('create-product', { ...createProductDto }));
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
  getAllProducts(@Query() paginationDto: PaginationDto) {
    return this.client.send('find-all-products', { ...paginationDto });
  }

  @Get(':id')
  async getOneProduct(@Param('id') id: string) {
    try {
      return await firstValueFrom(this.client.send('find-one-product', { id }));
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    try {
      return await firstValueFrom(this.client.send('update-product', { ...updateProductDto, id }));
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    try {
      return await firstValueFrom(this.client.send('delete-product', { id }));
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
