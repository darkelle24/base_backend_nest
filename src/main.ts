import { RolesEnum } from '@Helper/roles/roles';
import { NestFactory } from '@nestjs/core';
import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'fs';
import "reflect-metadata"
import { activateLogs } from './logs';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { basicCreate } from './common/fn.helper';
import { User } from './api/users/entities/user.entity';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  activateLogs(app)

  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Test docs')
    .setDescription('The test API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config, {deepScanRoutes: true});

  fs.writeFileSync("./swagger-spec.json", JSON.stringify(document));
  SwaggerModule.setup('api', app, document, {explorer: true});

  await app.listen(configService.get<number>('BACK_PORT'), () => {
    console.log('[WEB]', `http://localhost:` + configService.get<number>('BACK_PORT'));
    console.log('[API]', `http://localhost:` + configService.get<number>('BACK_PORT') + '/api');
  });
}
bootstrap();
