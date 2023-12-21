import { connect } from '../config/db.config';
import { ProductModel, Product } from '../model/product.model';

export class ProductRepository {
  constructor() {
    connect();
  }

  async getProduct(product): Promise<null | Product> {
    let data: null | Product = null;

    try {
      data = await ProductModel.findOne(product);
    } catch (err) {
      console.log('Error :::' + err);
    }

    return data;
  }

  async getProducts(product): Promise<null | Product[]> {
    let data: null | Product[] = null;

    try {
      const result = await ProductModel.find(product);
      const isResult = !!result.length;

      isResult && (data = result);
    } catch (err) {
      console.log('Error :::' + err);
    }

    return data;
  }

  async createProduct(product): Promise<null | Product> {
    let data: null | Product = null;

    try {
      data = await ProductModel.create(product);
    } catch (err) {
      console.log('Error :::' + err);
    }

    return data;
  }
}
