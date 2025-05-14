import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    async login(dto: AuthDto) {
        const user = await this.userService.findUserByEmail(dto.email);
        if (!user) throw new UnauthorizedException('Invalid credentials');

        if (!user.password) throw new UnauthorizedException('Invalid credentials');
        const isMatch = await bcrypt.compare(dto.password, user.password);
        if (!isMatch) throw new UnauthorizedException('Invalid credentials');
        
        return {
            message: 'Login successful'
        }
    }

    async register(dto: AuthDto) {
        const userExist = await this.userService.findUserByEmail(dto.email);
        if(userExist) throw new UnauthorizedException('Email already exists');

        const hashPass = await bcrypt.hash(dto.password, 10);
        const user = await this.userService.createUser({
            name: dto.name,
            email: dto.email,
            password: hashPass,
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
