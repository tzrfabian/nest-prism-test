import { Controller, Get, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Users")
@ApiBearerAuth() // Adds Bearer authentication to the Users API
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @ApiOperation({
    summary: "Get all users",
    description: "This endpoint retrieves all users from the database",
  })
  @ApiResponse({
    status: 200,
    description: "List of all users.",
    type: [String] // Adjust the type based on your User entity
  })
  @UseGuards(JwtAuthGuard)
  @Get("all")
  async getAllUsers() {
    return this.userService.getAllUsers();
  }
}