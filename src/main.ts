import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiOperation, DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseInterceptor } from './interceptors/response.interceptor';

// Starts the NestJS application on the specified port
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // Set a global prefix for all routes
  app.useGlobalInterceptors(new ResponseInterceptor);

  const swagConf = new DocumentBuilder()
    .setTitle('NestJS Test API Docs')
    .setDescription('API documentation for the NestJS test application')
    .setVersion('1.0')
    .addBearerAuth() // Adds Bearer authentication to the Swagger UI
    .build();
  const docs = SwaggerModule.createDocument(app, swagConf);
  SwaggerModule.setup('api/docs', app, docs); // Set up Swagger UI at /api/docs
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
