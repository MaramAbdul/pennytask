/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  // Connect to MongoDB
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    Logger.log('✅ MongoDB Connected Successfully');
  } catch (error) {
    Logger.error('❌ MongoDB Connection Failed:', error);
    process.exit(1);
  }

  // Start NestJS Application
  const app = await NestFactory.create(AppModule);

  // enabling cors 
  app.enableCors({
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  await app.listen(port);

  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();