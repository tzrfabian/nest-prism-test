import { Controller, Post, Req, UseGuards, Body, Get, ForbiddenException, Delete, Query, BadRequestException, NotFoundException } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PetService } from './pet.service';
import { PetDto } from './dto/pet.dto';

@Controller('pets')
export class PetController {
    constructor(private readonly petService: PetService) {}

    @UseGuards(JwtAuthGuard)
    @Post('add')
    async addPet(@Body() dto: PetDto, @Req() req) {
        const ownerId = req.user.userId; // still need to check if the user is authenticated
        if (!ownerId) {
            throw new ForbiddenException('User not authenticated');
        }
        console.log('Owner ID:', ownerId);
        return this.petService.addPet(dto, ownerId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('')
    async getAllPets() {
        return this.petService.getAllPets();
    }

    @UseGuards(JwtAuthGuard)
    @Get('pet')
    async getPetById(@Query('petId') id: string) {
        if (!id) {
            throw new BadRequestException('Pet ID not provided');
        }
        const pet = await this.petService.getPetById(id);
        if (!pet) {
            throw new NotFoundException('Pet not found');
        }
        return pet;
    }

    @UseGuards(JwtAuthGuard)
    @Delete('')
    async deletePet(@Query('idDelete') id: string, @Req() req) {
        const userId = req.user.userId; // still need to check if the user is authenticated
        if(!userId) throw new ForbiddenException('User not authenticated');
        return this.petService.deletePet(id, userId);
    }
    

}
