import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = process.env.API_CORE_PORT || 4000;
  await app.listen(port);
  console.log(`🚀 api-core server listening on http://localhost:${port}`);
}
bootstrap();
