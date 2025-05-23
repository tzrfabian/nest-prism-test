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

    async getPetById(id: string) {
        const pet = await this.prisma.pet.findUnique({
            where: { id }
        });

        if (!pet) {
            return { message: 'Pet not found' };
        }

        return {
            id: pet.id,
            name: pet.name,
            species: pet.species,
            breed: pet.breed,
            age: pet.age,
            weight: pet.weight,
            ownerId: pet.ownerId,
            createdAt: pet.createdAt,
            updatedAt: pet.updatedAt
        };
    }

    async updatePet(dto: PetDto, id: string, userId: string) {
        const pet = await this.prisma.pet.findUnique({
            where: { id }
        });

        if (!pet) {
            return { message: 'Pet not found' };
        }

        if (pet.ownerId !== userId) {
            return { message: 'You are not authorized to update this pet' };
        }

        const updatedPet = await this.prisma.pet.update({
            where: { id },
            data: {
            ...dto
            }
        });
        return { message: 'Pet updated successfully', pet: updatedPet };
    }

    async deletePet(id: string, userId: string) {
        const pet = await this.prisma.pet.findUnique({
            where: { id }
        });

        if (!pet) {
            return { message: 'Pet not found' };
        }

        if (pet.ownerId !== userId) {
            return { message: 'You are not authorized to delete this pet' };
        }

        await this.prisma.pet.delete({
            where: { id }
        });

        return { message: 'Pet deleted successfully' };
    }
}
