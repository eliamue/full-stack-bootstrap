import { Router } from 'express';
import Items from '../models/Items.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const item = await Items.insert(req.body);

      res.send(item);
    } catch (error) {
      next(error);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const allItems = await Items.getAll();

      res.send(allItems);
    } catch (error) {
      next(error);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const item = await Items.getById(id);

      res.send(item);
    } catch (err) {
      next(err);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const {
        title,
        textfield,
        website,
        logo,
        truthy_thing,
        number_thing,
      } = req.body;

      const updatedItem = await Items.update(id, {
        title,
        textfield,
        website,
        logo,
        truthy_thing,
        number_thing,
      });

      res.send(updatedItem);
    } catch (err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const item = await Items.delete(id);

      res.send({
        message: `You have deleted ${item.title}.`,
      });
    } catch (err) {
      next(err);
    }
  });
