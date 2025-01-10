import express, { Application } from 'express';
import routes from './routes';
import config from './config/envConfig';
import cors from 'cors';

const app: Application = express();

app.use(cors())
app.use(express.json());
app.use('/', routes);

const port = config.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})