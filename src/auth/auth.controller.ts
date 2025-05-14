import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() dto: LoginDto) {
        const token = await this.authService.login(dto);
        if (!token) {
            throw new BadRequestException('Invalid credentials');
        }
        return {
            token,
            message: 'Login successful',
        };
    }
}
