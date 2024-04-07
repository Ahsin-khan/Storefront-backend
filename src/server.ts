import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { usersRoutes } from './handlers/userHandler';
import { productRoutes } from './handlers/productHandler';

const app: express.Application = express();
const address: string = '0.0.0.0:5000';

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
productRoutes(app)


app.listen(5000, function () {
  console.log(`starting app on: ${address}`);
});
