import express from 'express';
import bodyParser from 'body-parser';
import office from './routes/offices';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/v1/offices', office);

app.use((req, res, next) => {
  res.status(404).json({
    status: 404,
    error: 'Page Not Found',
  });
  next();
});

const port = process.env.port || 8080;

const server = app.listen(port, () => console.log(`Politico started on Port: ${port}`));

export default server;