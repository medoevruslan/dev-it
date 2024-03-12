import { UserModel } from '../model/user.model';
import bcrypt from 'bcrypt';
import { CreateUserType } from '../controller/auth.controller';
import { TokenService } from './token.service';
import { UserDto } from '../dtos/user-dto';
import { UserIDJwtPayload } from 'jsonwebtoken';
import { ApiError } from '@/src/exceptions/api-error';
export type CreateUserModel = Omit<CreateUserType, 'passwordConfirmation'>;

const tokenService = new TokenService();
export class UserService {
  #model = new UserModel();
  async signup(candidate: CreateUserModel) {
    const user = await this.#model.getByEmail(candidate.email);
    if (user) {
      throw ApiError.BadRequest('VALIDATION_ERROR', {
        fieldErrors: {
          email: ['Email is already taken'],
        },
      });
    }

    const hashedPassword = await bcrypt.hash(candidate.password, 3);
    const createdUser = await this.#model.create({
      ...candidate,
      password: hashedPassword,
    });

    const userDto = new UserDto(createdUser);

    const { accessToken, refreshToken } = tokenService.generateTokens({
      ...userDto,
    });
    await tokenService.saveToken(createdUser.id, refreshToken);

    return {
      userDto,
      accessToken,
      refreshToken,
    };
  }

  async login(email: string, password: string) {
    const user = await this.#model.getByEmail(email);

    if (!user) {
      throw ApiError.NotFound('There is no such user', {});
    }

    const isPassEquals = await bcrypt.compare(password, user.password);

    if (!isPassEquals) {
      throw ApiError.BadRequest('VALIDATION_ERROR', {
        fieldErrors: {
          password: ['Wrong Password'],
        },
      });
    }

    const userDto = new UserDto(user);

    const { accessToken, refreshToken } = tokenService.generateTokens({
      ...userDto,
    });
    await tokenService.saveToken(user.id, refreshToken);

    return {
      userDto,
      accessToken,
      refreshToken,
    };
  }

  async refresh(token: string) {
    const userData = tokenService.validateRefreshToken<UserIDJwtPayload>(token);
    const tokenFromDb = await tokenService.findToken(token);

    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    const user = await this.#model.getById(userData.userId);

    const userDto = new UserDto(user);

    const { accessToken, refreshToken } = tokenService.generateTokens({
      ...userDto,
    });

    await tokenService.saveToken(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
      userDto,
    };
  }

  async me(token: string) {
    const userData = tokenService.validateAccessToken<UserIDJwtPayload>(token);

    if (!userData) {
      throw ApiError.UnauthorizedError();
    }

    const user = await this.#model.getById(userData.userId);

    if (!user) {
      throw ApiError.NotFound('User not found', {});
    }

    return new UserDto(user);
  }

  async logout(token: string) {
    return await tokenService.deleteToken(token);
  }
}
