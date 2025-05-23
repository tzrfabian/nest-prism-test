import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthDtoLogin, AuthDtoRegis } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

// Handles login and registration logic using UserService
@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async login(dto: AuthDtoLogin) {
        const user = await this.userService.findUserByEmail(dto.email);
        // console.log('User from DB:', user);
        if (!user) throw new UnauthorizedException('Invalid credentials');
        if (!user.password) throw new UnauthorizedException('Invalid credentials');
        const isMatch = await bcrypt.compare(dto.password, user.password);
        if (!isMatch) throw new UnauthorizedException('Invalid credentials');

        const payload = {
            sub: user.id, email: user.email
        };
        const token = await this.jwtService.signAsync(payload);
        
        return {
            message: 'Login successful',
            token: token,
        }
    }

    async register(dto: AuthDtoRegis) {
        const userExist = await this.userService.findUserByEmail(dto.email);
        if(userExist) throw new UnauthorizedException('Email already exists');
        
        if(!dto.name || !dto.email || !dto.password) throw new UnauthorizedException('All fields are required');

        if(dto.password.length < 6) throw new UnauthorizedException('Password must be at least 6 characters long');

        const user = await this.userService.createUser({
            name: dto.name,
            email: dto.email,
            password: dto.password,
        });

        return {
            message: 'User created successfully',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            }
        }
    }
}
