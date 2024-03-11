import jwt from 'jsonwebtoken';
import { TokenModel } from '../model/token.model';
import { UserDto } from '@/src/dtos/user-dto';
import { ACCESS_TOKEN_AGE, REFRESH_TOKEN_AGE } from '@/src/constants';

declare module 'jsonwebtoken' {
  export interface UserIDJwtPayload extends jwt.JwtPayload {
    userId: string;
    username: string;
    email: string;
  }
}

const secretKey = 'your-secret-key';
const refreshTokenSecret = 'your-refresh-secret-key';

export class TokenService {
  #model = new TokenModel();
  generateAccessToken(user: UserDto) {
    return jwt.sign(user, secretKey, { expiresIn: `${ACCESS_TOKEN_AGE}m` });
  }

  generateRefreshToken = (user: UserDto) => {
    return jwt.sign(user, refreshTokenSecret, {
      expiresIn: `${REFRESH_TOKEN_AGE}d`,
    });
  };

  generateTokens = (user: UserDto) => {
    return {
      accessToken: this.generateAccessToken(user),
      refreshToken: this.generateRefreshToken(user),
    };
  };

  validateAccessToken<T>(token: string): T | null {
    try {
      return jwt.verify(token, secretKey) as T;
    } catch (err) {
      return null;
    }
  }
  validateRefreshToken<T>(token: string): T | null {
    try {
      const result = jwt.verify(token, refreshTokenSecret) as T;
      console.log('validateRefreshToken verify:', result);
      return result;
    } catch (err) {
      return null;
    }
  }

  async saveToken(userId: string, refreshToken: string) {
    return await this.#model.createOrUpdate(userId, refreshToken);
  }

  async findToken(token: string) {
    return await this.#model.get(token);
  }

  async deleteToken(token: string) {
    console.log('token service');
    return await this.#model.delete(token);
  }
}
