import express, { Request, Response } from 'express';
import { DashboardQueries } from '../services/dashboard';
import jwt from 'jsonwebtoken';
import { NextFunction } from 'express';

const dashboard = new DashboardQueries();

const usersCurrnetOrder = async (req: Request, res: Response) => {
  const id = req.params.id;
  //  const status= req.body.status;

  const products = await dashboard.usersCurrnetOrder(id);
  res.json(products);
};

const usersCompletedOrder = async (req: Request, res: Response) => {
  const id = req.params.id;
  //  const status= req.body.status;
  const products = await dashboard.usersCompletedOrder(id);
  res.json(products);
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

//Insert User Id in URL parameter.
const dashboardRoutes = (app: express.Application) => {
  app.get('/user-current-order/:id', verifyAuthToken, usersCurrnetOrder);
  app.get('/user-complete-order/:id', verifyAuthToken, usersCompletedOrder);
};

export default dashboardRoutes;
