import * as express from 'express';
import routes from '@/userRoutes';
const app = express();
app.use(express.json());

app.use(routes);

app.listen(3000, () => console.log('Listening on port 3000'));