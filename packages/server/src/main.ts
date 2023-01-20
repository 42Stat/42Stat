import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

// todo: delete here
export const frontendURL = 'https://6824-121-135-181-41.jp.ngrok.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    // TODO: CORS 설정
    origin: frontendURL,
    methods: ['GET', 'POST'],
    credentials: true, // ?
    allowedHeaders: ['Content-Type', 'Authorization'],
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
