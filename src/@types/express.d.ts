export type User = {
  id: string;
  email: string;
  name: string | null;
  password: string;
};
declare global {
  namespace Express {
    export interface Request {
      user: Partial<User>;
    }
  }
}
