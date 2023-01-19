import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    // TODO: CORS 설정
    // origin: 'http://localhost:11900',
    // credentials: true, // ?
    // allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Swagger Configuration
  const swaggerConfig = new DocumentBuilder()
    .setTitle('42Stat API Docs')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      name: 'Authorization',
      in: 'header',
    })
    .build();
  const apiDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, apiDocument);

  await app.listen(3000);
}
bootstrap();
