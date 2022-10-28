import { AllExceptionFilter } from '@infrastructure/common/filter/exception.filter';
import { LoggingInterceptor } from '@infrastructure/common/interceptors/logger.interceptor';
import {
  ResponseFormat,
  ResponseInterceptor,
} from '@infrastructure/common/interceptors/response.interceptor';
import { LoggerService } from '@infrastructure/logger/logger.service';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const env = process.env.NODE_ENV;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.use(cookieParser());

  app.use(helmet());
  // filters
  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));

  // pipes
  app.useGlobalPipes(new ValidationPipe());

  // interceptors
  app.useGlobalInterceptors(new LoggingInterceptor(new LoggerService()));
  app.useGlobalInterceptors(new ResponseInterceptor(new LoggerService()));

  app.setGlobalPrefix('v1');

  app.set('trust proxy', 1);

  if (env !== 'production') {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Peaksum works')
      .setDescription('Peaksum works API 문서입니다.')
      .setVersion('1.0')
      .setExternalDoc('스웨거 JSON', '/v1/doc-json')
      .build();
    const document = SwaggerModule.createDocument(app, config, {
      extraModels: [ResponseFormat],
      deepScanRoutes: true,
    });
    SwaggerModule.setup('doc', app, document, {
      useGlobalPrefix: true,
      customCssUrl: '/static/swagger-material.css',
      customSiteTitle: 'Peaksum works swagger',
      customfavIcon: '/static/favicon.ico',
      swaggerOptions: {
        persistAuthorization: true,
      },
    });
  }

  await app.listen(8100);
}
bootstrap();
