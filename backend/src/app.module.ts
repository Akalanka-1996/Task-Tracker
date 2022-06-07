import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from './customers/customers.module';
import { User } from './typeorm';
import entities from './typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/controllers/auth/auth.controller';
import { AuthService } from './auth/services/auth/auth.service';




@Module({
  imports: [CustomersModule, UsersModule, AuthModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'nestjs',
    // entities: [User], // importing single entities
    entities,
    synchronize: true,

  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
