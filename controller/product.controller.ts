import { Request, Response, NextFunction } from 'express';

import { ProductService } from '../service/product.service';

import { handleResponse } from '../utils/response';

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  async getProducts(req: Request, res: Response, next: NextFunction) {
    console.log('Controller: getProducts', null);

    try {
      const products = await this.productService.getProducts({});

      return handleResponse(res, 200, 'Products was retrived successfuly!', {
        products,
      });
    } catch (error) {
      return next(error);
    }
  }
}
