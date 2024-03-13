import { UserModel } from '../model/user.model';
import bcrypt from 'bcrypt';
import { TokenService } from './token.service';
import { UserDto } from '../dtos/user-dto';
import { UserIDJwtPayload } from 'jsonwebtoken';
import { ApiError } from '@/src/exceptions/api-error';
import { CreateUserType } from '@/src/schema/auth.schema';
import { User } from '@/prisma/client';

export type CreateUserModel = Omit<CreateUserType, 'passwordConfirmation'>;

export class UserService {
  private readonly model = new UserModel();
  private readonly tokenService = new TokenService();
  async signup(candidate: CreateUserModel) {
    const user = await this.model.getByEmail(candidate.email);
    if (user) {
      throw ApiError.BadRequest('VALIDATION_ERROR', [
        {
          field: 'email',
          message: 'Email is already taken',
        },
      ]);
    }

    const hashedPassword = await bcrypt.hash(candidate.password, 3);
    const createdUser = await this.model.create({
      ...candidate,
      password: hashedPassword,
    });

    return await this.generateAndSaveToken(createdUser);
  }

  async login(email: string, password: string) {
    const user = await this.model.getByEmail(email);

    if (!user) {
      throw ApiError.NotFound('There is no such user', []);
    }

    const isPassEquals = await bcrypt.compare(password, user.password);

    if (!isPassEquals) {
      throw ApiError.BadRequest('VALIDATION_ERROR', [
        {
          field: 'password',
          message: 'Wrong Password',
        },
      ]);
    }

    return await this.generateAndSaveToken(user);
  }

  async refresh(token: string) {
    const userData =
      this.tokenService.validateRefreshToken<UserIDJwtPayload>(token);
    const tokenFromDb = await this.tokenService.findToken(token);

    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    const user = await this.model.getById(userData.userId);

    return await this.generateAndSaveToken(user);
  }

  async me(token: string) {
    const userData =
      this.tokenService.validateAccessToken<UserIDJwtPayload>(token);

    if (!userData) {
      throw ApiError.UnauthorizedError();
    }

    const user = await this.model.getById(userData.userId);

    if (!user) {
      throw ApiError.NotFound('User not found', []);
    }

    return new UserDto(user);
  }

  async logout(token: string) {
    return await this.tokenService.deleteToken(token);
  }

  async generateAndSaveToken(user: User) {
    const userDto = new UserDto(user);

    const { accessToken, refreshToken } = this.tokenService.generateTokens({
      ...userDto,
    });

    await this.tokenService.saveToken(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
      userDto,
    };
  }
}
