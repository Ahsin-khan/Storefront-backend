import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { usersRoutes } from './handlers/userHandler';
import { productRoutes } from './handlers/productHandler';
import { orderRoutes } from './handlers/orderHandler';
import dashboardRoutes from './handlers/dashboardHandler';

const app: express.Application = express();
const address: string = '0.0.0.0:3000';

const corsOptions = {
  origin: 'http://someotherdomain.com',
  optionSuccessStatus: 200 //some legacy browsers (IE11)
};

app.use(cors(corsOptions)); //using cors on all routes
app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});

//Users Routes
usersRoutes(app);

//Products Routes
productRoutes(app);

//Order Routes
orderRoutes(app);

//Dashboard Route
dashboardRoutes(app);

app.listen(4000, function () {
  console.log(`starting app on: ${address}`);
});
