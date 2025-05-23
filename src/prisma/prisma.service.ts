import { Injectable } from "@nestjs/common";
import { PrismaClient } from "../../generated/prisma/client";

// Provides PrismaClient instance for dependency injection
@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        super();
    }
}