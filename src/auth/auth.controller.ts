import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDtoLogin, AuthDtoRegis } from './dto/auth.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
// Exposes /auth/login and /auth/register endpoints
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({
        summary: 'User Login',
        description: 'This endpoint allows users to log in with their credentials. To Retrieve a JWT token, users must provide their email and password.'
    })
    @ApiResponse({
        status: 200,
        description: 'User logged in successfully. Returns a JWT token.',
        type: String
    })
    @Post('login')
    login(@Body() dto: AuthDtoLogin) {
        return this.authService.login(dto);
    }

    @ApiOperation({
        summary: 'User Registration',
        description: 'This endpoint allows new users to register by providing their name, email, and password. It creates a new user account and returns a success message.'
    })
    @ApiResponse({
        status: 201,
        description: 'User registered successfully. Returns a success message.',
        type: String
    })
    @Post('register')
    register(@Body() dto: AuthDtoRegis) {
        return this.authService.register(dto);
    }
}
