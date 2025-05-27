import { Controller, Post, Req, UseGuards, Body, Get, ForbiddenException, Delete, Query, BadRequestException, NotFoundException, Put } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PetService } from './pet.service';
import { PetDto } from './dto/pet.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Pets')
@ApiBearerAuth()
@Controller('pets')
export class PetController {
    constructor(private readonly petService: PetService) {}

    @ApiOperation({
        summary: 'Add a new pet',
        description: 'This endpoint allows users to add a new pet to the database.'
    })
    @ApiResponse({
        status: 201,
        description: 'Pet successfully added.',
        type: PetDto
    })
    @UseGuards(JwtAuthGuard)
    @Post('add')
    async addPet(@Body() dto: PetDto, @Req() req) {
        const ownerId = req.user.userId; // still need to check if the user is authenticated
        if (!ownerId) {
            throw new ForbiddenException('User not authenticated');
        }
        // console.log('Owner ID:', ownerId);
        return this.petService.addPet(dto, ownerId);
    }

    @ApiOperation({
        summary: 'Get all pets',
        description: 'This endpoint retrieves all pets from the database.'
    })
    @ApiResponse({
        status: 200,
        description: 'List of all pets.'
    })
    @UseGuards(JwtAuthGuard)
    @Get('')
    async getAllPets() {
        return this.petService.getAllPets();
    }

    @ApiOperation({
        summary: 'Get a pet by ID',
        description: 'This endpoint retrieves a pet by its ID.'
    })
    @ApiResponse({
        status: 200,
        description: 'Pet found.',
        type: PetDto
    })
    @UseGuards(JwtAuthGuard)
    @Get('find')
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

    @ApiOperation({
        summary: 'Update a pet',
        description: 'This endpoint allows users to update an existing pet.'
    })
    @ApiResponse({
        status: 200,
        description: 'Pet successfully updated.',
        type: PetDto
    })
    @UseGuards(JwtAuthGuard)
    @Put('update')
    async updatePet(@Body() dto: PetDto, @Query('petId') id: string, @Req() req) {
        const userId = req.user.userId; // still need to check if the user is authenticated
        if (!userId) {
            throw new ForbiddenException('User not authenticated');
        }
        if (!id) {
            throw new BadRequestException('Pet ID not provided');
        }
        return this.petService.updatePet(dto, id, userId);
    }

    @ApiOperation({
        summary: 'Delete a pet',
        description: 'This endpoint allows users to delete a pet by its ID.'
    })
    @ApiResponse({
        status: 200,
        description: 'Pet successfully deleted.'
    })
    @UseGuards(JwtAuthGuard)
    @Delete('')
    async deletePet(@Query('idDelete') id: string, @Req() req) {
        const userId = req.user.userId; // still need to check if the user is authenticated
        if(!userId) throw new ForbiddenException('User not authenticated');
        return this.petService.deletePet(id, userId);
    }
    

}
