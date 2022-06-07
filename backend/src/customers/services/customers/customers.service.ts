import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from 'src/customers/dtos/CreateCustomer.dto';
import { Customer } from 'src/customers/types/Customer';

@Injectable()
export class CustomersService {
  private customers: Customer[] = [
    {
      id: 1,
      email: 'kasun4@gmail.com',
      name: 'Kasun Kasun',
      
    },
    {
      id: 2,
      email: 'akalanka4@gmail.com',
      name: 'Akalanka Akalanka'
     
    },
    {
      id: 3,
      email: 'gamage4@gmail.com',
      name: 'Gamage Gamage'
      
    },
  ];

  findCustomerById(id: number){
    return this.customers.find((user) => user.id === id);
  }

  createCustomer(customerDto: CreateCustomerDto) {
      console.log("create")
      this.customers.push(customerDto);
  }

  getCustomers() {
      return this.customers;
  }
}
