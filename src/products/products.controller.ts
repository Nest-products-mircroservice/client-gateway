import { Body, ConflictException, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { PRODUCTS_SERVICE } from 'src/config';

@Controller('products')
export class ProductsController {
  constructor(@Inject(PRODUCTS_SERVICE) private readonly productsClient: ClientProxy) { }

  @Post()
  createProduct(@Body() body: any) {
    return 'create product';
  }

  @Get()
  getAllProducts(@Query() paginationDto: PaginationDto) {
    return this.productsClient.send({ cmd: 'find-all-products' }, { ...paginationDto });
  }

  @Get(':id')
  async getOneProduct(@Param('id') id: string) {
    try {
      return await firstValueFrom(
        this.productsClient.send({ cmd: 'find-one-product' }, { id })
      );
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @Patch(':id')
  updateProduct(@Param('id') id: string, @Body() body: any) {
    return 'update product' + id;
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return 'delete product' + id;
  }
}
