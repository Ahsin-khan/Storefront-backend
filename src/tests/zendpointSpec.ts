import supertest from 'supertest';
import app from '../server';

const request = supertest(app);

describe('User Test endpoint responses', () => {
  it('gets the / endpoint from server.ts', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });

  it('should create a new user', async () => {
    // Define the user data to be sent in the request
    const userData = {
      firstname: 'firstname',
      lastname: 'lastname',
      username: 'username',
      password: 'abc123'
    };
    // Send a POST request to the '/users' endpoint with the user data
    const response = await request.post('/users').send(userData);

    expect(response.status).toBe(200);
  });

  it('should retrieve all users', async () => {
    //     // Define token
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmaXJzdF9uYW1lIjoiTWF6aGFyIiwibGFzdF9uYW1lIjoiWmViIiwidXNlcm5hbWUiOiJtb2hzaW41OTU1IiwicGFzc3dvcmQiOiIkMmIkMTAkZjVYajIxaHBtLmdhMUJTM3FWL3dyZUowdXM5THRXb0piajQ2SFFSRmxLQlZTMmE4aUh5UG0ifSwiaWF0IjoxNzEyMDA5NTIxfQ.iKths7gs1cCD6YS5tbvVBD2I_Cx1QI3ArWckqddzMFY';

    // Send a GET request to the '/users' endpoint with the token in the header
    const response = await request
      .get('/users')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('should retrieve a specific user by ID', async () => {
    // Define the userId for the user you want to retrieve
    const userId = '3';

    // Define token
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmaXJzdF9uYW1lIjoiTWF6aGFyIiwibGFzdF9uYW1lIjoiWmViIiwidXNlcm5hbWUiOiJtb2hzaW41OTU1IiwicGFzc3dvcmQiOiIkMmIkMTAkZjVYajIxaHBtLmdhMUJTM3FWL3dyZUowdXM5THRXb0piajQ2SFFSRmxLQlZTMmE4aUh5UG0ifSwiaWF0IjoxNzEyMDA5NTIxfQ.iKths7gs1cCD6YS5tbvVBD2I_Cx1QI3ArWckqddzMFY';

    // Send a GET request to the '/users/:id' endpoint with the token in the header
    const response = await request
      .get(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});

describe('Product Test endpoint responses', () => {
  it('gets the api endpoint', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });

  it('should create a new product', async () => {
    // Define the product data to be sent in the request
    const productData = {
      name: 'Test Product',
      price: 10,
      category: 'Test Category'
    };

    // Define token
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmaXJzdF9uYW1lIjoiTWF6aGFyIiwibGFzdF9uYW1lIjoiWmViIiwidXNlcm5hbWUiOiJtb2hzaW41OTU1IiwicGFzc3dvcmQiOiIkMmIkMTAkZjVYajIxaHBtLmdhMUJTM3FWL3dyZUowdXM5THRXb0piajQ2SFFSRmxLQlZTMmE4aUh5UG0ifSwiaWF0IjoxNzEyMDA5NTIxfQ.iKths7gs1cCD6YS5tbvVBD2I_Cx1QI3ArWckqddzMFY';

    // Send a POST request to the '/products' endpoint with the product data and token in the header
    const response = await request
      .post('/products')
      .send(productData)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('should retrieve all products', async () => {
    // Define token
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmaXJzdF9uYW1lIjoiTWF6aGFyIiwibGFzdF9uYW1lIjoiWmViIiwidXNlcm5hbWUiOiJtb2hzaW41OTU1IiwicGFzc3dvcmQiOiIkMmIkMTAkZjVYajIxaHBtLmdhMUJTM3FWL3dyZUowdXM5THRXb0piajQ2SFFSRmxLQlZTMmE4aUh5UG0ifSwiaWF0IjoxNzEyMDA5NTIxfQ.iKths7gs1cCD6YS5tbvVBD2I_Cx1QI3ArWckqddzMFY';

    // Send a GET request to the '/products' endpoint with the token in the header
    const response = await request
      .get('/products')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('should retrieve a specific product by ID', async () => {
    // Define the product ID for the product you want to retrieve
    const productId = '3';

    // Define token
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmaXJzdF9uYW1lIjoiTWF6aGFyIiwibGFzdF9uYW1lIjoiWmViIiwidXNlcm5hbWUiOiJtb2hzaW41OTU1IiwicGFzc3dvcmQiOiIkMmIkMTAkZjVYajIxaHBtLmdhMUJTM3FWL3dyZUowdXM5THRXb0piajQ2SFFSRmxLQlZTMmE4aUh5UG0ifSwiaWF0IjoxNzEyMDA5NTIxfQ.iKths7gs1cCD6YS5tbvVBD2I_Cx1QI3ArWckqddzMFY';

    // Send a GET request to the '/products/:id' endpoint with the token in the header
    const response = await request
      .get(`/products/${productId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('should update a specific product by ID', async () => {
    // Define the product ID for the product you want to update
    const productId = '1';

    // Define the updated product data
    const updatedProductData = {
      name: 'Updated Product Name',
      price: 20,
      category: 'Updated Category'
    };

    // Define token
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmaXJzdF9uYW1lIjoiTWF6aGFyIiwibGFzdF9uYW1lIjoiWmViIiwidXNlcm5hbWUiOiJtb2hzaW41OTU1IiwicGFzc3dvcmQiOiIkMmIkMTAkZjVYajIxaHBtLmdhMUJTM3FWL3dyZUowdXM5THRXb0piajQ2SFFSRmxLQlZTMmE4aUh5UG0ifSwiaWF0IjoxNzEyMDA5NTIxfQ.iKths7gs1cCD6YS5tbvVBD2I_Cx1QI3ArWckqddzMFY';

    // Send a PUT request to the '/products/:id' endpoint with the updated product data and token in the header
    const response = await request
      .put(`/products/${productId}`)
      .send(updatedProductData)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('should delete a specific product by ID', async () => {
    // Define the product ID for the product you want to delete
    const productId = '1';

    // Define token
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmaXJzdF9uYW1lIjoiTWF6aGFyIiwibGFzdF9uYW1lIjoiWmViIiwidXNlcm5hbWUiOiJtb2hzaW41OTU1IiwicGFzc3dvcmQiOiIkMmIkMTAkZjVYajIxaHBtLmdhMUJTM3FWL3dyZUowdXM5THRXb0piajQ2SFFSRmxLQlZTMmE4aUh5UG0ifSwiaWF0IjoxNzEyMDA5NTIxfQ.iKths7gs1cCD6YS5tbvVBD2I_Cx1QI3ArWckqddzMFY';

    // Send a DELETE request to the '/products/:id' endpoint with the token in the header
    const response = await request
      .delete(`/products/${productId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('should retrieve products by category', async () => {
    // Define the category for the products you want to retrieve
    const category = 'kitchen';

    // Define your token
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmaXJzdF9uYW1lIjoiTWF6aGFyIiwibGFzdF9uYW1lIjoiWmViIiwidXNlcm5hbWUiOiJtb2hzaW41OTU1IiwicGFzc3dvcmQiOiIkMmIkMTAkZjVYajIxaHBtLmdhMUJTM3FWL3dyZUowdXM5THRXb0piajQ2SFFSRmxLQlZTMmE4aUh5UG0ifSwiaWF0IjoxNzEyMDA5NTIxfQ.iKths7gs1cCD6YS5tbvVBD2I_Cx1QI3ArWckqddzMFY';

    // Send a GET request to the '/products/category/:category' endpoint with the category and token in the header
    const response = await request
      .get(`/products/category/${category}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});

describe('Order Test endpoint responses', () => {
  it('should create a new order', async () => {
    // Define the order data to be sent in the request
    const orderData = {
      status: 'active',
      user_id: '3'
    };

    // Send a POST request to the '/orders' endpoint with the order data
    const response = await request.post('/orders').send(orderData);
    expect(response.status).toBe(200);
  });

  it('should retrieve all orders', async () => {
    // Send a GET request to the '/orders' endpoint with the token in the header
    const response = await request.get('/orders');
    expect(response.status).toBe(200);
  });

  it('should retrieve a specific order by ID', async () => {
    // Define the order ID for the order you want to retrieve
    const orderId = 2;

    // Send a GET request to the '/orders/:id' endpoint with the token in the header
    const response = await request.get(`/orders/${orderId}`);

    expect(response.status).toBe(200);
  });

  it('should update a specific order by ID', async () => {
    // Define the order ID for the order you want to update
    const orderId = 1;

    // Define the updated order data
    const updatedOrderData = {
      status: 'Updated order status',
      user_id: '1'
    };

    // Send a PUT request to the '/orders/:id' endpoint with the updated order data and token in the header
    const response = await request
      .put(`/orders/${orderId}`)
      .send(updatedOrderData);
    expect(response.status).toBe(200);
  });

  it('should add a product in order_products table', async () => {
    // Define the product data to be sent in the request
    const addProduct = {
      quantity: 2,
      productId: '1',
      orderId: '1'
    };

    // Send a POST request to the '/orders' endpoint with the product data
    const response = await request.post('/orders').send(addProduct);
    expect(response.status).toBe(200);
  });

  //Deleting an added product here in order to avoid Foreign Key Constraint
  it('should delete an added product in order_products table', async () => {
    // Define the product ID for the product you want to delete
    const productId = '1';

    // Send a DELETE request to the '/orders/addedProduct/:id' endpoint
    const response = await request.delete(`/orders/addedProduct/${productId}`);

    expect(response.status).toBe(200);
  });

  //Deleting an order here in order to avoid Foreign Key Constraint
  it('should delete a specific order by ID', async () => {
    // Define the order ID for the order you want to delete
    const orderId = '1';

    // Send a DELETE request to the '/orders/:id' endpoint with the token in the header
    const response = await request.delete(`/orders/${orderId}`);

    expect(response.status).toBe(200);
  });

  //Deleting a user here in order to avoid Foreign Key Constraint
  it('should delete a specific user by ID', async () => {
    // Define the user ID for the user you want to delete
    const userId = '1';

    // Define token
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmaXJzdF9uYW1lIjoiTWF6aGFyIiwibGFzdF9uYW1lIjoiWmViIiwidXNlcm5hbWUiOiJtb2hzaW41OTU1IiwicGFzc3dvcmQiOiIkMmIkMTAkZjVYajIxaHBtLmdhMUJTM3FWL3dyZUowdXM5THRXb0piajQ2SFFSRmxLQlZTMmE4aUh5UG0ifSwiaWF0IjoxNzEyMDA5NTIxfQ.iKths7gs1cCD6YS5tbvVBD2I_Cx1QI3ArWckqddzMFY';

    // Send a DELETE request to the '/users/:id' endpoint with the token in the header
    const response = await request
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});
