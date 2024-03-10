// express.d.ts

declare namespace Express {
  export interface Request {
    user?: any; // using an any is intentional
  }
}
