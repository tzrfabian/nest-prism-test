import { Module } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetController } from './pet.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [PetService, PrismaService],
  controllers: [PetController]
})
export class PetModule {}
