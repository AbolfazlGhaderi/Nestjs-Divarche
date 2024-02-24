import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDTO } from './dto/login.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  

  @Post('login')
  async login(@Body() LoginData: loginDTO) {
    return this.authService.login(LoginData);
  }
}
