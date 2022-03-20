import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import itemsController from './controllers/items.js';
import cors from 'cors';

const app = express();

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../../front-end/public/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/items', itemsController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
