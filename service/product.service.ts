import { Product } from '../model/product.model';

import { ProductRepository } from '../repository/product.repository';

export class ProductService {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  async getProduct(product): Promise<null | Product> {
    return await this.productRepository.getProduct(product);
  }

  async getProducts(product): Promise<null | Product[]> {
    return await this.productRepository.getProducts(product);
  }

  async createProduct(product): Promise<null | Product> {
    return await this.productRepository.createProduct(product);
  }
}
