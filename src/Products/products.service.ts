import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.modal';

@Injectable()
export class ProductService {
  private product: Product[] = [];

  insertProduct(title: string, desc: string, price: number) {
    const pid = Math.random().toString();
    const newProduct = new Product(pid, title, desc, price);
    this.product.push(newProduct);
    return pid;
  }

  getProduct() {
    return [...this.product];
  }

  private findProduct(id: string): [Product, number] {
    const productItemIndex = this.product.findIndex((item) => item.id === id);
    const productItem = this.product[productItemIndex];
    if (!productItem) {
      throw new NotFoundException();
    }
    return [productItem, productItemIndex];
  }
  getProductById(id: string) {
    const productItem = this.findProduct(id)[0];
    return productItem;
  }

  updateProduct(id: string, title: string, description: string, price: number) {
    const [productItem, index] = this.findProduct(id);
    const updatedItem = { ...productItem };
    if (title) {
      updatedItem.title = title;
    }
    if (description) {
      updatedItem.description = description;
    }
    if (price) {
      updatedItem.price = price;
    }
    this.product[index] = updatedItem;
    return updatedItem;
  }

  removeProduct(id: string) {
    const index = this.findProduct(id)[1];
    this.product.splice(index, 1);
  }
}
