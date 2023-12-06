import * as express from 'express';
import usuarioRoutes from '@/routes/usuarioRoutes';
const app = express();
const port = process.env.APP_PORT;

middlewares();
routes();

app.listen(port, () => console.log('Listening on port 3000'));

function middlewares() {
  app.use(express.json());
}

function routes() {
  app.use(usuarioRoutes);
}
