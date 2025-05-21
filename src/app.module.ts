import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { LoggerMiddleware } from './middlewares/logger.middleware';

// Import AuthModule and UserModule, register AppController and AppService
@Module({
  imports: [AuthModule, UserModule],
  providers: [PrismaService, AppService],
  exports: [PrismaService],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware) // Apply LoggerMiddleware
      .forRoutes('users'); // Apply middleware to all routes
  }
}
