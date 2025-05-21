import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Starts the NestJS application on the specified port
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // Set a global prefix for all routes
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
