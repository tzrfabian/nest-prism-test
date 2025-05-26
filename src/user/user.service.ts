import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

// Handles user creation and lookup using PrismaService
@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async createUser(data: { name: string, email: string; password: string }) {
        try {
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
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('User creation failed, please try again');
        }
    }

    async findUserByEmail(email: string) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { email },
            });
            return user;
        } catch (error) {
            console.error('Error finding user by email:', error);
            throw new Error('User lookup failed, please try again');
        }
    }

    async getAllUsers() {
        try {
            const users = await this.prisma.user.findMany();
            return users.map(user => ({
                id: user.id,
                name: user.name,
                email: user.email,
            }));
        } catch (error) {
            console.error('Error fetching all users:', error);
            throw new Error('Failed to fetch users, please try again');
        }
    }
}
