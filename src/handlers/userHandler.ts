import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import jwt from 'jsonwebtoken';
import { NextFunction } from 'express';

const store = new UserStore();
const token_secret = process.env.TOKEN_SECRET;

const index = async (_req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (error:any) {
    res.status(404);
    res.json(error.message);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      password: req.body.password
    };

    const newUser = await store.create(user);
    const token = jwt.sign({ user: newUser }, token_secret as string);

    res.json({ newUser, token });
  } catch (err:any) {
    res.status(401);
    res.json(err.message);
  }
};

const show = async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await store.show(parseInt(id));
  try {
    res.status(200);
    res.json(user);
  } catch (err:any) {
    res.status(404);
    res.json(err.message);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userDeleted = await store.delete(req.params.id);
    res.json(userDeleted);
  } catch (err:any) {
    res.status(400);
    res.json(err.message);
  }
};

const authenticate = async (req: Request, res: Response) => {
  try {
    const userName: string = req.body.userName;
    const password: string = req.body.password;
    const userAuth = await store.authenticate(userName, password);
    const token = jwt.sign({ user: userAuth }, token_secret as string);
    res.json(token);
  } catch (err: any) {
    res.status(401);
    res.json(err.message);
  }
};

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      res.status(401).json('Authorization header missing');
      return; // Stop further execution
    }
    const token = authorizationHeader.split(' ')[1];
    if (!token) {
      res.status(401).json('Token not found');
      return; // Stop further execution
    }

    // Verify the token
    jwt.verify(token, process.env.TOKEN_SECRET as string, (err) => {
      if (err) {
        // JWT verification failed
        res.status(401).json('Invalid token');
        return; // Stop further execution
      }
      // JWT verification succeeded
      next();
    });
  } catch (error) {
    res.status(500).json('Internal Server Error');
  }
};

const usersRoutes = (app: express.Application) => {
  app.post('/users', create);
  app.post('/usersAuth', authenticate);
  app.get('/users', verifyAuthToken, index);
  app.get('/users/:id', verifyAuthToken, show);
  app.delete('/users/:id', verifyAuthToken, deleteUser);
};

export { usersRoutes };
