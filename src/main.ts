import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const PORT = process.env.PORT;
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  await app.listen(PORT, '0.0.0.0', () =>
    console.log(`server started on port ${PORT}`),
  );
}
bootstrap();
