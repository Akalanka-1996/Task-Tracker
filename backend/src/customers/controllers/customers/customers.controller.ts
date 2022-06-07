import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Req, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateCustomerDto } from 'src/customers/dtos/CreateCustomer.dto';
import { CustomersService } from 'src/customers/services/customers/customers.service';


@Controller('customers')
export class CustomersController {

    constructor(private customersService: CustomersService) {

    }

    @Get(':id')
    getCustomer(
        @Param('id', ParseIntPipe) id:number, 
        @Req() req: Request, 
        @Res() res: Response
    ) {
        // console.log(typeof id)
        // return this.customersService.findCustomerById();
        // return this.customersService.findCustomerById(id)

        const customer = this.customersService.findCustomerById(id);
        if(customer) {
            res.send(customer)
        } else {
            res.status(400).send({msg: "Customer not found!"})
        }
        
    }

    @Get('/search/:id')
    searchCustomerById(@Param('id', ParseIntPipe) id: number){
        console.log("search")
        const customer = this.customersService.findCustomerById(id);
        if (customer) return customer;
        else throw new HttpException('Customer not found!', HttpStatus.BAD_REQUEST)

    }

    @Get('')
    getAllCustomers() {
        return this.customersService.getCustomers();
    }


    @Post('/create')
    @UsePipes(ValidationPipe)
    createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
        console.log("create")
        console.log(createCustomerDto)
        this.customersService.createCustomer(createCustomerDto)
    }
}
