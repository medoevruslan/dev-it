import type { Request, Response } from 'express';
import { z } from 'zod';
import { UserService } from '../service/user.service';
import { ApiError } from '@/src/exceptions/api-error';
import { ACCESS_TOKEN_AGE, REFRESH_TOKEN_AGE } from '@/src/constants';

const createUserSchema = z
  .object({
    username: z.string({ required_error: 'username is required' }).min(1),
    email: z.string({ required_error: 'email is required' }).email(),
    password: z
      .string({ required_error: 'password is required' })
      .min(3)
      .max(10),
    passwordConfirmation: z.string().min(3),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  });

const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(10),
});

export type CreateUserType = Required<z.infer<typeof createUserSchema>>;
export type LoginUserType = z.infer<typeof loginUserSchema>;

const userService = new UserService();

const me = async (req: Request, res: Response) => {
  if (!req.cookies.accessToken) {
    return res.status(401).end();
  }
  const { accessToken } = req.cookies;
  try {
    const user = await userService.me(accessToken);

    return res.status(200).json(user);
  } catch (err) {
    if (err instanceof ApiError) {
      return res.status(err.status).json({ message: err.message });
    } else {
      return res.status(500).json({ error: err.message });
    }
  }
};

const signup = async (
  req: Request<object, object, CreateUserType>,
  res: Response
) => {
  const { body: candidate } = req;

  const userParse = createUserSchema.safeParse(candidate);

  if (userParse.success === false) {
    // throw ApiError.BadRequest('', userParse.error.)
    // console.log(userParse.error.errors);
    return res.status(400).json({ error: userParse.error.flatten() });
  }

  try {
    const user = await userService.signup({
      username: candidate.username,
      email: candidate.email,
      password: candidate.password,
    });

    res.cookie('accessToken', user.accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * ACCESS_TOKEN_AGE,
    }); // 15 minutes
    res.cookie('refreshToken', user.refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * REFRESH_TOKEN_AGE,
    }); // 7days

    res.json(user.userDto);
  } catch (err) {
    console.log(err);
  }
};
const login = async (
  req: Request<object, object, LoginUserType>,
  res: Response
) => {
  const { body: candidate } = req;

  const userParse = loginUserSchema.safeParse(candidate);

  if (userParse.success === false) {
    return res.status(400).json({ error: userParse.error.flatten() });
  }

  try {
    const user = await userService.login(candidate.email, candidate.password);
    res.cookie('accessToken', user.accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * ACCESS_TOKEN_AGE,
    }); // 15 minutes
    res.cookie('refreshToken', user.refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * REFRESH_TOKEN_AGE,
    }); // 7days

    res.json({ accessToken: user.accessToken });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const logout = async (req: Request, res: Response) => {
  if (!req.cookies.refreshToken) {
    return res.status(401).end('you are not logged in');
  }
  const { refreshToken } = req.cookies;
  res.clearCookie('refreshToken');
  res.clearCookie('accessToken');
  try {
    await userService.logout(refreshToken);
    return res.status(204).end();
  } catch (err) {
    console.log(err);
    return res.status(404).json({ error: err.message });
  }
};

const refreshToken = async (req: Request, res: Response) => {
  if (!req.cookies.refreshToken) {
    return res.status(401).end();
  }
  const { refreshToken: cookieRefreshToken } = req.cookies;
  const user = await userService.refresh(cookieRefreshToken);

  res.cookie('accessToken', user.accessToken, {
    httpOnly: true,
    maxAge: 1000 * 60 * ACCESS_TOKEN_AGE,
  }); // 15 minutes
  res.cookie('refreshToken', user.refreshToken, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * REFRESH_TOKEN_AGE,
  }); // 7days

  return res.status(204).json(user.userDto);
};

export const authController = {
  signup,
  login,
  logout,
  me,
  refreshToken,
};
