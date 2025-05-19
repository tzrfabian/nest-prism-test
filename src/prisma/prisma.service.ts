import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

// Provides PrismaClient instance for dependency injection
@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        super();
    }
}