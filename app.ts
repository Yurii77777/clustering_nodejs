import express = require('express');
import bodyParser = require('body-parser');

import { ProductController } from './controller/product.controller';

class App {
  public express: express.Application;
  public productController: ProductController;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.productController = new ProductController();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
      if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
      }
      next();
    });
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  private routes(): void {
    // For AWS Beanstalk health check:
    this.express.get('/healthcheck', (req, res, next) => {
      res.send('Ok!');
    });

    this.express.get('/api/products', (req, res, next) => {
      this.productController.getProducts(req, res, next);
    });

    // handle undefined routes
    this.express.use('*', (req, res, next) => {
      res.status(404).send('API end-point does not exist');
    });
  }
}

export default new App().express;
