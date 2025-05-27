import { ApiProperty } from "@nestjs/swagger";

export class PetDto {
    @ApiProperty({
        description: 'The name of the pet',
        example: 'Budi'
    })
    name: string;

    @ApiProperty({
        description: 'The species of the pet',
        example: 'Dog'
    })
    species: string;

    @ApiProperty({
        description: 'The breed of the pet',
        example: 'Golden Retriever'
    })
    breed: string;

    @ApiProperty({
        description: 'The age of the pet in years',
        example: 3
    })
    age: number;
    
    @ApiProperty({
        description: 'The weight of the pet in kilograms',
        example: 20
    })
    weight: number;
}