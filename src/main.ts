import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as basicAuth from 'express-basic-auth';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix(process.env.BASE_PATH);
  app.use(
    ['/swagger', '/docs-json'],
    basicAuth({
      challenge: true,
      users: {
        admin: `${process.env.SWAGGER_PASSWORD}`,
      },
    }),
  );

  const time = new Date().toLocaleString('us-en', {
    timeZone: 'Asia/Kolkata',
    hour12: true,
  });

  const options = new DocumentBuilder()
  .setTitle(process.env.APP_NAME)
  .setDescription(
    `© Mayurkumar Malaviya. All Rights Reserved.  Last Updated : ${time}`,
  )
  .setVersion(process.env.APP_VERSION)
  .setBasePath(process.env.BASE_PATH)
  .addBearerAuth()
  .addCookieAuth('Refresh')
  .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
