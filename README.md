# NestJS Prisma Starter API

A starter REST API built with [NestJS](https://nestjs.com/) and [Prisma](https://www.prisma.io/).

---

This test project already had Documentation routes, that generated by swagger. <br>
<br>
After you running it in your local device, you can access it on:
```
http://localhost:5000/api/docs
```

---

## Project Structure

```
.
├── prisma/                # Prisma schema and migrations
├── src/
│   ├── app.controller.ts  # Root and ping endpoints
│   ├── app.module.ts      # Main module
│   ├── app.service.ts     # Root service
│   ├── main.ts            # Entry point
│   ├── auth/              # Auth module (JWT, login, register)
│   ├── user/              # User module (user CRUD)
│   ├── pet/               # Pet module (pet CRUD)
│   ├── middlewares/       # Custom middlewares
│   └── prisma/            # Prisma service
├── generated/             # Generated Prisma client (gitignored)
├── test/                  # E2E tests
├── .env                   # Environment variables
├── package.json
└── ...
```

---

## Environment Variables

Create a `.env` file in your project root with:

```
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<db>
JWT_SECRET=your_jwt_secret
PORT=5000
```

---

## Installation

```bash
npm install
```

---

## Database Setup

1. **Configure your database** in `.env`.
2. **Run migrations** and generate the Prisma client:
   ```bash
   npx prisma migrate deploy
   npx prisma generate
   ```

---

## Running the App

```bash
# development
npm run start

# watch mode
npm run start:dev

# production
npm run start:prod
```

The API will be available at `http://localhost:5000/api`.

---

## API Endpoints

### Root

- `GET /api/`  
  Returns: `Hello World!`

- `GET /api/ping`  
  Returns: `Pong!`

---

### Auth

- `POST /api/auth/register`  
  Register a new user.  
  **Body:**
  ```json
  {
    "name": "User Name",
    "email": "user@example.com",
    "password": "yourPassword"
  }
  ```
  **Response:**  
  `201 Created`
  ```json
  {
    "message": "User created successfully",
    "user": {
      "id": "userId",
      "name": "User Name",
      "email": "user@example.com"
    }
  }
  ```

- `POST /api/auth/login`  
  Login and receive a JWT token.  
  **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "yourPassword"
  }
  ```
  **Response:**  
  `200 OK`
  ```json
  {
    "message": "Login successful",
    "token": "<jwt_token>"
  }
  ```

---

### Users

- `GET /api/users/all`  
  **Requires JWT**  
  Returns all users (id, name, email).

  **Header:**  
  `Authorization: Bearer <token>`

  **Response:**
  ```json
  [
    {
      "id": "userId",
      "name": "User Name",
      "email": "user@example.com"
    }
  ]
  ```

---

### Pets

- `POST /api/pets/add`  
  **Requires JWT**  
  Add a new pet for the authenticated user.

  **Header:**  
  `Authorization: Bearer <token>`

  **Body:**
  ```json
  {
    "name": "Pulu",
    "species": "Cat",
    "breed": "Siamese",
    "age": 2,
    "weight": 4.5
  }
  ```
  **Response:**
  ```json
  {
    "id": "petId",
    "name": "Pulu",
    "species": "Cat",
    "breed": "Siamese",
    "age": 2,
    "weight": 4.5,
    "ownerId": "userId",
    "createdAt": "...",
    "updatedAt": "..."
  }
  ```

- `GET /api/pets`  
  **Requires JWT**  
  Get all pets.

  **Header:**  
  `Authorization: Bearer <token>`

  **Response:**
  ```json
  [
    {
      "id": "petId",
      "name": "Pulu",
      "species": "Cat",
      "breed": "Siamese",
      "age": 2,
      "weight": 4.5,
      "ownerId": "userId",
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
  ```

- `GET /api/pets/find?petId=<petId>`  
  **Requires JWT**  
  Find a pet by its Id

  **Header:**  
  `Authorization: Bearer <token>`

  **Response:**
  ```json
  {
    "id": "<petId>",
    "name": "bombardilo",
    "species": "crocodilo",
    "breed": "carnivore",
    "age": 5,
    "weight": 20.5,
    "ownerId": "<ownerId>",
    "createdAt": "...",
    "updatedAt": "..."
  }
  ```

- `PUT /api/pets/update?petId=<petId>`  
  **Requires JWT**  
  Update the owner's pet data.

  **Header:**  
  `Authorization: Bearer <token>`

  **Body:**
  ```json
  {
    "name": "Pulu",
    "species": "Cat",
    "breed": "Siamese",
    "age": 2,
    "weight": 4.5
  }
  ```
  **Response:**
  ```json
  {
    "id": "petId",
    "name": "Pulu",
    "species": "Cat",
    "breed": "Siamese",
    "age": 2,
    "weight": 4.5,
    "ownerId": "userId",
    "createdAt": "...",
    "updatedAt": "..."
  }
  ```

- `DELETE /api/pets?idDelete=<petId>`  
  **Requires JWT**  
  Only the owner can delete their pet.

  **Header:**  
  `Authorization: Bearer <token>`

  **Response:**
  ```json
  { "message": "Pet deleted successfully" }
  ```

---

## Error Responses

- `401 Unauthorized` — Missing or invalid JWT token.
- `403 Forbidden` — Not allowed to access or modify resource.
- `404 Not Found` — Resource does not exist.

---

## Testing

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e
```

---

## Notes

- The Prisma client is generated in `/generated/prisma/client` (see `.gitignore`).
- All protected routes require a valid JWT in the `Authorization` header.
- Only pet owners can delete their own pets.

---

## Useful Commands

```bash
# Run migrations and generate client
npx prisma migrate deploy
npx prisma generate

# Start the app
npm run start:dev
```

---

## Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [JWT Guide](https://jwt.io/introduction/)

---