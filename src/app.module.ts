import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { AppService } from './app.service';
import { AppController } from './app.controller';

// Import AuthModule and UserModule, register AppController and AppService
@Module({
  imports: [AuthModule, UserModule],
  providers: [PrismaService, AppService],
  exports: [PrismaService],
  controllers: [AppController],
})
export class AppModule {}
