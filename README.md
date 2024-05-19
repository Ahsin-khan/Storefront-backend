# Storefront Backend Project: 

## Table of Contents
*	Introduction
*	Features
*	Installation
*	Usage
*	Endpoints
*	Testing
*	Contributing
*	License
  
## Introduction: 
The Storefront Backend Project serves as the backend infrastructure for an online storefront application, catering to various functionalities essential for product management and order processing. Developed with Node.js and Express, this API ensures seamless communication between the frontend and database, enabling smooth user interactions.

## Features
*	The API offers endpoints for managing products, users, and orders, facilitating operations such as product indexing, retrieval, creation, and order management.
*	Utilizing JWTs, the API ensures secure authentication for accessing sensitive endpoints, safeguarding user privacy and data integrity.
*	Postgres is employed for efficient database management, enabling storage and retrieval of application data with ease.
*	Each model includes comprehensive test suites and mocks, ensuring reliability and stability of the API functionalities, promoting code quality and robustness.
*	Endpoints are CORS enabled, allowing seamless communication with frontend applications across different domains, enhancing accessibility and usability.


## Installation
*	Clone the repository:
git clone https://github.com/Ahsin-khan/storefront-backend.git
*	Install dependencies:
bcrypt: "^5.1.1", body-parser: "^1.20.2",cors: "^2.8.5", cross-env: "^7.0.3", db-migrate: "^0.11.14", db-migrate-pg: "^1.5.2", dotenv: "^16.4.5", express: "^4.19.2", jsonwebtoken: "^9.0.2", nodemon: "^3.1.0", pg: "^8.11.5", supertest: "^6.3.4", typescript: "^5.4.4", @types/bcrypt: "^5.0.2", @types/cors: "^2.8.17", @types/express: "^4.17.21", @types/jasmine: "^5.1.4", @types/jsonwebtoken: "^9.0.6", @types/nodemon: "^1.19.6", @types/pg: "^8.11.4", @types/supertest: "^6.0.2", @typescript-eslint/eslint-plugin: "^7.5.0", @typescript-eslint/parser: "^7.5.0", eslint: "^8.8.0", eslint-config-prettier: "^8.3.0", eslint-plugin-prettier: "^4.0.0", jasmine: "^5.1.0", jasmine-spec-reporter: "^7.0.0", jasmine-ts: "^0.4.0", prettier: "^2.5.1", rimraf: "^5.0.5", ts-node: "^10.9.2", tsc-watch: "^6.2.0".

# Usage

## Scripts:
*	npm run prettier (Formatting)
*	npm run lint (Error Checking)
*	npm run db-test-down (For refreshing all db migrations before testing)
*	npm run test (For transpiling and Testing)
*	npm run start (To start the server and autosaving by Nodemon)

# Endpoints

## Users Endpoints
* app.post('/users', create);
* app.post('/usersAuth', authenticate);
* app.get('/users', verifyAuthToken, index);
* app.get('/users/:id', verifyAuthToken, show);
* app.delete('/users/:id', verifyAuthToken, deleteUser);

## Produtcts Endpoints
* app.post('/products', verifyAuthToken, create);
* app.get('/products', verifyAuthToken, index);
* app.get('/products/:id', verifyAuthToken, show);
* app.put('/products/:id', verifyAuthToken, update);
* app.delete('/products/:id', verifyAuthToken, deleteProduct);
* app.get('/products/category/:category', verifyAuthToken, getProductByCategory);

## Orders Endpoints
* app.post('/orders', create);
* app.get('/orders', index);
* app.get('/orders/:id', show);
* app.put('/orders/:id', update);
* app.delete('/orders/:id', deleteOrder);
* app.delete('/orders/addedProduct/:id', deleteAddedProduct);
* app.post('/orders/:id/products', addProduct);

## Dashboard Endpoints
* app.get('/user-current-order/:id', verifyAuthToken, usersCurrnetOrder);
* app.get('/user-complete-order/:id', verifyAuthToken, usersCompletedOrder);


# Testing:
The project includes unit tests for endpoints and methods to interact with database using Jasmine. To run the tests, use the following command:
Npm run test 

# Contributing:
Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.


# License:
This project is licensed under the MIT License.

