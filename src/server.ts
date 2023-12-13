import * as express from 'express';
import * as cors from 'cors';
import usuarioRoutes from '@/routes/usuarioRoutes';
import empresaRoutes from '@/routes/empresaRoutes';
import vendedorRoutes from '@/routes/vendedorRoutes';
import clienteRoutes from '@/routes/clienteRoutes';
import produtoRoutes from '@/routes/produtoRoutes';

const app = express();
const port = process.env.APP_PORT;

app.use((cors as (options: cors.CorsOptions) => express.RequestHandler)({}));

middlewares();
routes();

app.listen(port, () => console.log(`Listening on port: ${port}`));

function middlewares() {
  //antes de routes
  app.use(express.json());
}

function routes() {
  app.use('/empresas/', empresaRoutes);
  app.use('/users/', usuarioRoutes);
  app.use('/vendedores/', vendedorRoutes);
  app.use('/clientes/', clienteRoutes);
  app.use('/produtos/', produtoRoutes);
}
