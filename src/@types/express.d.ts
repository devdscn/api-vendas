export type User = {
  id: string;
  email: string;
  name: string | null;
  password: string;
  idVendedor: number | null;
};
declare global {
  namespace Express {
    export interface Request {
      user: Partial<User>;
    }
  }
}
