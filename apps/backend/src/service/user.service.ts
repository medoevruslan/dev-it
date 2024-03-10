import { UserModel } from '../model/user.model';
import bcrypt from 'bcrypt';
import { CreateUserType } from '../controller/auth.controller';
import { TokenService } from './token.service';
import { UserDto } from '../dtos/user-dto';
import { UserIDJwtPayload } from 'jsonwebtoken';

export type CreateUserModel = Omit<CreateUserType, 'passwordConfirmation'>;

const tokenService = new TokenService();
export class UserService {
  #model = new UserModel();
  async signup(candidate: CreateUserModel) {
    const user = await this.#model.getByEmail(candidate.email);
    if (user) {
      throw new Error('Email is already existing, try another one');
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
      throw new Error('There is no such user');
    }

    const isPassEquals = await bcrypt.compare(password, user.password);

    if (!isPassEquals) {
      throw new Error('Wrong password');
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
      throw new Error('You are not authorized');
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

  async logout(token: string) {
    return await tokenService.deleteToken(token);
  }
}
