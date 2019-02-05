import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import office from './routes/offices';
import party from './routes/parties';
import home from './routes/home';
import logger from './config/winston';
import auth from './routes/auth';
import { uploader, cloudinaryConfig } from './config/cloudinaryConfig';


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('*', cloudinaryConfig);
app.use('/', home);
app.use('/api/v1/offices', office);
app.use('/api/v1/parties', party);
app.use('/api/v1/auth', auth);

app.use((_req, res, next) => {
  res.status(404).json({
    status: 404,
    error: 'Page Not Found',
  });
  next();
});

const port = process.env.PORT || 8080;

const server = app.listen(port, () => logger.info(`Politico started on Port: ${port}`));

export default server;
