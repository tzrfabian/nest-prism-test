import { Controller, Post, Req, UseGuards, Body, Get } from '@nestjs/common';
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
            throw new Error('User not authenticated');
        }
        console.log('Owner ID:', ownerId);
        return this.petService.addPet(dto, ownerId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('')
    async getAllPets() {
        return this.petService.getAllPets();
    }
    

}
