import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpException, HttpStatus, Inject, NotFoundException, Param, ParseIntPipe, Post, UseFilters, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UserNotFoundException } from 'src/users/exceptions/UserNotFound.exception';
import { HttpExceptionFilter } from 'src/users/filters/HttpException.filter';
import { UsersService } from 'src/users/services/users/users.service';
import { SerializedUser } from 'src/users/types';

@Controller('users')
export class UsersController {
    constructor(@Inject('USER_SERVICE') private readonly userService: UsersService) {

    }

    @Get('')
    getUsers() {
        return this.userService.getUsers();
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/username/:username')
    getByUsername(@Param('username') username: string ) {
        const user = this.userService.getUsersByUsername(username);

        if (user) return new SerializedUser(user);
        else throw new HttpException('User not found', HttpStatus.BAD_REQUEST)
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @UseFilters(HttpExceptionFilter)    // use exception filter we created
    @Get('id/:id')
    getById(@Param('id', ParseIntPipe) id: number) {
        const user = this.userService.getUserById(id);

        if (user) return new SerializedUser(user);

        else {
            // throw new UserNotFoundException('User is not found', 500) // passing custom messages and status codes
            // throw new NotFoundException()   // nestjs exception
            throw new UserNotFoundException()
        }

    }

    // adding users to database
    @Post('create')
    @UsePipes(ValidationPipe)  // invoke the validations in the CreateUserDto
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }

    // delete a user from the database
    @Delete(':id')
    deleteUser(@Param('id') id: number) {
        this.userService.deleteUser(id)
        return {
            statusCode: HttpStatus.OK,
            message: 'User deleted successfully'
        }

    }

    
}
