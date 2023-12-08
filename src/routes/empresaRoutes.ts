import { Router } from 'express';
import { EmpresaController } from '@/controller/EmpresaController';

const routes = Router();

routes.get('/index', new EmpresaController().index);
routes.get('/show/:id', new EmpresaController().show);

export default routes;
