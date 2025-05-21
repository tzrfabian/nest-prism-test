# Nest Base Starter API Documentation

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Base URL

```
http://localhost:5000/
```

---

## Root Endpoints

### `GET /`

- **Description:** Returns a hello message.
- **Response:**  
  `200 OK`
  ```
  Hello World!
  ```

### `GET /ping`

- **Description:** Health check endpoint.
- **Response:**  
  `200 OK`
  ```
  Pong!
  ```

---

## Users Endpoints
Base path: `/users`

### `GET /api/users/all`
- **Description:** Fetch all users data
- **Response:**
  - `200 OK`
    ```json
    [
      {
          "id": "<user_id>",
          "name": "<user_name>",
          "email": "<user_email>"
      },
      {
          "id": "<user_id>",
          "name": "<user_name>",
          "email": "<user_email>"
      }...
    ]
    ```
---

## Auth Endpoints

Base path: `/auth`

### `POST /auth/login`

- **Description:** Login with email and password.
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "yourPassword"
  }
  ```
- **Response:**
  - `200 OK`
    ```json
    {
      "message": "Login successful"
    }
    ```
  - `401 Unauthorized`
    ```json
    {
      "statusCode": 401,
      "message": "Invalid credentials",
      "error": "Unauthorized"
    }
    ```

---

### `POST /auth/register`

- **Description:** Register a new user.
- **Request Body:**
  ```json
  {
    "name": "User Name",
    "email": "user@example.com",
    "password": "yourPassword"
  }
  ```
- **Response:**
  - `201 Created`
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
  - `401 Unauthorized`
    ```json
    {
      "statusCode": 401,
      "message": "Email already exists",
      "error": "Unauthorized"
    }
    ```

---

## User Endpoints

> **Note:** No public user endpoints are currently exposed.

---

## Models

### User

| Field      | Type    | Description         |
|------------|---------|---------------------|
| id         | string  | Unique identifier   |
| name       | string  | User's name         |
| email      | string  | User's email        |
| password   | string  | Hashed password     |
| createdAt  | Date    | Creation timestamp  |
| updatedAt  | Date    | Update timestamp    |

---

## Error Responses

- `404 Not Found`  
  Returned if the endpoint does not exist.

- `401 Unauthorized`  
  Returned for invalid credentials or duplicate registration.

---

## Example Usage

### Register

```sh
curl -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com","password":"secret"}'
```

### Login

```sh
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"secret"}'
```

---

For more details, see:
- app.controller.ts
- auth.controller.ts
- auth.service.ts
- schema.prisma

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).