const { faker } = require('@faker-js/faker');

import { ProductModel } from '../model/product.model';

export const generateMockData = async () => {
  const products = await ProductModel.find({});
  const isProducts = !!products.length;

  if (isProducts) {
    return;
  }

  // Генерація 1000 мок-записів
  for (let i = 0; i < 1000; i++) {
    await ProductModel.create({
      name: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      // Заповніть інші поля за потреби
    });
  }

  console.log('Mock data generated successfully');
};
