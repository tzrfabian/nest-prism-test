import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

// Handles user creation and lookup using PrismaService
@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async createUser(data: { name: string, email: string; password: string }) {
        const hashPass = await bcrypt.hash(data.password, 10);
        const user = await this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashPass,
            },
        });
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            message: 'User created successfully'
        };
    }

    async findUserByEmail(email: string) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        return user;
    }

    async getAllUsers() {
        const users = await this.prisma.user.findMany();
        return users.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
        }));
    }
}
