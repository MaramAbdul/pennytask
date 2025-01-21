import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from '../models/user.model';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {}

  async signup(dto: SignupDto) {
    // ✅ Check if user already exists
    const existingUser = await this.userModel.findOne({ email: dto.email });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    // ✅ Hash password before storing
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // ✅ Create new user
    const user = new this.userModel({
      name: dto.name, // ✅ Save name
      email: dto.email,
      password: hashedPassword,
    });

    await user.save();

    // ✅ Generate JWT token
    const token = this.jwtService.sign(
      { userId: user._id, email: user.email },
      { expiresIn: '8h' }
    );

    // ✅ Return user details and token
    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    };
  }

  async login(dto: LoginDto) {
    const user = await this.userModel.findOne({ email: dto.email });
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // ✅ Generate JWT token
    const token = this.jwtService.sign(
      { userId: user._id, email: user.email },
      { expiresIn: '8h' }
    );

    // ✅ Return user details along with token
    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    };
  }
}