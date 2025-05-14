import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    async login(dto: { email: string; password: string }){
        const user = await this.userService.validateUser(dto.email, dto.password);
        if(!user) return null;
        
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET environment variable is not defined');
        }

        const token = jwt.sign(
            { sub: user.name, email: user.email }, 
            process.env.JWT_SECRET, 
            { expiresIn: '24h' }
        );
        // In a real application, you should use a more secure secret and store it in an environment variable
        // For example: process.env.JWT_SECRET
        return token;
    }
}
