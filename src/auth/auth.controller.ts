import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDtoLogin, AuthDtoRegis } from './dto/auth.dto';

// Exposes /auth/login and /auth/register endpoints
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    login(@Body() dto: AuthDtoLogin) {
        return this.authService.login(dto);
    }

    @Post('register')
    register(@Body() dto: AuthDtoRegis) {
        return this.authService.register(dto);
    }
}
