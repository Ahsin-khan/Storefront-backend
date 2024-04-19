import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/order';

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (error: any) {
    res.json(error.message);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      status: req.body.status,
      user_id: req.body.user_id
    };

    const newOrder = await store.create(order);
    res.json({ newOrder });
  } catch (err: any) {
    res.status(401).json(err.message);
  }
};

const show = async (req: Request, res: Response) => {
  const id = req.params.id;
  const order = await store.show(parseInt(id));
  try {
    res.status(200);
    res.json(order);
  } catch (err: any) {
    res.status(404);
    res.json(err.message);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      id: parseInt(req.params.id),
      status: req.body.status,
      user_id: req.body.user_id
    };

    const updatedOrder = await store.update(order);
    res.json(updatedOrder);
  } catch (err: any) {
    res.status(404).json(err.message);
  }
};

const deleteOrder = async (req: Request, res: Response) => {
  try {
    const orderDeleted = await store.delete(req.params.id);
    res.json(orderDeleted);
  } catch (err: any) {
    res.status(400);
    res.json(err.message);
  }
};

const addProduct = async (req: Request, res: Response) => {
  try {
    const orderId: string = req.params.id;
    const productId: string = req.body.productId;
    const quantity: number = parseInt(req.body.quantity);

    const newOrderProduct = await store.addProduct(
      quantity,
      productId,
      orderId
    );
    res.json({ newOrderProduct });
  } catch (err) {
    console.log(err);
    res.status(401);
    res.json(err);
  }
};

const orderRoutes = (app: express.Application) => {
  app.post('/orders', create);
  app.get('/orders', index);
  app.get('/orders/:id', show);
  app.put('/orders/:id', update);
  app.delete('/orders/:id', deleteOrder);
  app.post('/orders/:id/products', addProduct);
};

export { orderRoutes };
