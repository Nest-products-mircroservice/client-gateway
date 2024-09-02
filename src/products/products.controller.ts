import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor() { }

  @Post()
  createProduct(@Body() body: any) {
    return 'create product';
  }

  @Get()
  getAllProducts() {
    return 'get all products';
  }

  @Get(':id')
  getOneProduct(@Param('id') id: string) {
    return 'get one product' + id;
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
