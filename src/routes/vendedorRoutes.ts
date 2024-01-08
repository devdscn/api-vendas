import { Router } from 'express';
import { VendedorController } from '@/controller/VendedorController';

const routes = Router();

//routes.use(loginRequired);
routes.get('/', new VendedorController().index);
routes.get('/show/:idEmpresa/:idVendedor', new VendedorController().show);

export default routes;
