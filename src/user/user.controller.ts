import { Controller, Get } from "@nestjs/common";
import { UserService } from "./user.service";


@Controller("api")
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get("users")
  async getAllUsers() {
    return this.userService.getAllUsers();
  }
}