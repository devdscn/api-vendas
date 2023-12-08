import * as express from 'express';
import usuarioRoutes from '@/routes/usuarioRoutes';
import empresaRoutes from '@/routes/empresaRoutes';
const app = express();
const port = process.env.APP_PORT;

routes();
middlewares();

app.listen(port, () => console.log('Listening on port 3000'));

function middlewares() {
  app.use(express.json());
}

function routes() {
  app.use('/empresas/', empresaRoutes);
  app.use('/users/', usuarioRoutes);
}
