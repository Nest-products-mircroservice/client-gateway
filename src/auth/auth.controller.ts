import { Body, Controller, Get, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { NATS_SERVICES } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { LoginUserDto, RegisterUserDto } from './dto';
import { AuthGuard } from './guards/auth.guard';
import { Token, User } from './decorators';
import { ICurrentUser } from './interfaces/current-user.interface';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICES) private readonly natsClient: ClientProxy) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return await firstValueFrom(
      this.natsClient.send('user.register', registerUserDto).pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      ),
    );
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return await firstValueFrom(
      this.natsClient.send('user.login', loginUserDto).pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      ),
    );
  }

  @UseGuards(AuthGuard)
  @Get('verify')
  async verify(@User() user: ICurrentUser, @Token() token: string) {
    return { user, token };
  }
}
