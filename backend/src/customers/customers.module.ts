import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { CustomersController } from './controllers/customers/customers.controller';
import { ValidateCustomerAccountMiddleware } from './middlewares/validate-customer-account.middleware';
import { ValidateCustomerMiddleware } from './middlewares/validate-customer.middlware';
import { CustomersService } from './services/customers/customers.service';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        ValidateCustomerMiddleware, // applying validatecustomermiddleware
        ValidateCustomerAccountMiddleware,  // applying validateaccount middleware
        (req: Request, res: Response, next: NextFunction) => {  //  applying a middlware function
          console.log('Last Middleware');
          next();
        },
      )
      // applying middleware to single route or multiple routes
      /*
      .forRoutes({
        path: 'customers/search/:id',
        method: RequestMethod.GET,
      });
      */

      // applying middleware to all the routes or multiple routes
      .exclude(
        {
          path: '/api/customers/create',
          method: RequestMethod.POST,
        },
        {
          path: '/api/customers',
          method: RequestMethod.GET,
        },
      )
      .forRoutes(CustomersController);
  }
}
