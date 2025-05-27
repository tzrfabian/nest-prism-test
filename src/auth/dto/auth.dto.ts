import { ApiProperty } from "@nestjs/swagger";

// Defines the data structure for authentication requests
export class AuthDtoRegis {
    @ApiProperty({
        description: 'The name of the user',
        example: 'Jane Doe'
    })
    name: string;
    
    @ApiProperty({
        description: 'The email address of the user',
        example: 'jane@mail.com'
    })
    email: string;

    @ApiProperty({
        description: 'The password for the user account',
        example: 'securepassword123'
    })
    password: string;
}

export class AuthDtoLogin {
    @ApiProperty({
        description: 'The email address of the user',
        example: 'jane@mail.com'
    })
    email: string;

    @ApiProperty({
        description: 'The password for the user account',
        example: 'securepassword123'
    })
    password: string;
}