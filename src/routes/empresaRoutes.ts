import { Router } from 'express';
import { EmpresaController } from '@/controller/EmpresaController';

const routes = Router();

//routes.use(loginRequired);
routes.get('/', new EmpresaController().index);
routes.get('/show/:id', new EmpresaController().show);

export default routes;
