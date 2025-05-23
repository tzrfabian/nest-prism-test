import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PetDto } from './dto/pet.dto';

@Injectable()
export class PetService {
    constructor(private prisma: PrismaService) {}

    async addPet(dto: PetDto, ownerId: string) {
        return this.prisma.pet.create({
            data: {
                ...dto,
                ownerId
            }
        });
    }

    async getAllPets() {
        const pets = await this.prisma.pet.findMany();
        if (!pets || pets.length === 0) return { message: 'No pets found' };
        
        return pets.map(pet => ({
            id: pet.id,
            name: pet.name,
            species: pet.species,
            breed: pet.breed,
            age: pet.age,
            weight: pet.weight,
            ownerId: pet.ownerId,
            createdAt: pet.createdAt,
            updatedAt: pet.updatedAt
        }));
    }
}
