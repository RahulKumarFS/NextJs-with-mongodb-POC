import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductService } from './products.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post()
  addProduct(
    @Body('title') prodTitle: string,
    @Body('description') desc: string,
    @Body('price') price: number,
  ): any {
    const generatedId = this.productService.insertProduct(
      prodTitle,
      desc,
      price,
    );
    return {
      id: generatedId,
      message: 'Product add successfully!!',
    };
  }

  @Get()
  getProducts(): any {
    return { products: this.productService.getProduct() };
  }

  @Get(':id')
  getProductById(@Param('id') id: string): any {
    return this.productService.getProductById(id);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') prodId: string,
    @Body('title') title: string,
    @Body('description') desc: string,
    @Body('price') price: number,
  ) {
    const updatedValue = this.productService.updateProduct(
      prodId,
      title,
      desc,
      price,
    );
    return {
      message: 'Product Updated Successfully',
      updatedValue,
    };
  }

  @Delete(':id')
  removeProduct(@Param('id') id: string) {
    this.productService.removeProduct(id);
    return {
      message: 'Removed the product Successfully',
    };
  }
}
