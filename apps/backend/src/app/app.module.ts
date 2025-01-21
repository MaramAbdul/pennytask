import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI), // Connect to MongoDB
    AuthModule, // Import Authentication Module
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}