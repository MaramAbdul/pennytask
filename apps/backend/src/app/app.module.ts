import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as dotenv from 'dotenv';
//here we will load the env file 
dotenv.config(); 

@Module({
  imports: [
     // Connect to MongoDB
    MongooseModule.forRoot(process.env.MONGO_URI),
    // Import Authentication Module
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}