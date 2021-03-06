import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/services/auth/auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) {

    }

    @Post('/login')
    @UseGuards(AuthGuard('local'))
    async login(@Request() req) {
        return this.authService.login(req.user)
    }
}
