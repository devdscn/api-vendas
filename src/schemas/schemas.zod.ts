import { z } from 'zod';

export const usuarioSchema = z.object({
  name: z.string().min(5, 'o nome precisa ter 5 caracteres'),
  email: z.string().email('informe um email válido'),
  password: z.string().min(6, 'a senha deve ter 6 caracteres'),
});
