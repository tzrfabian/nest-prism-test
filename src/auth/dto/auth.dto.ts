// Defines the data structure for authentication requests
export class AuthDtoRegis {
    name: string;
    email: string;
    password: string;
}

export class AuthDtoLogin {
    email: string;
    password: string;
}