# RESTful API with PostgreSQL and Node.js

This project demonstrates how to build a RESTful API using Node.js and PostgreSQL, featuring user authentication and session management with JWT tokens.

## Technologies Used

- **Node.js**
- **JWT**
- **PostgreSQL**

## Features

### User Authentication:

- `POST /register`  
  Register a new user

- `GET /login`  
  Login a user

- `DELETE /logout`  
  Logout a user

- `POST /refresh`  
  Refresh access and refresh tokens for session

### CRUD Operations for Users:
#### (all of this routes can be used just with (bearer) access_token)

- `GET /accounts/:user_id`  
  Get an account by it user_id

- `GET /accounts`  
  Get all accounts data

- `PUT /accounts`  
  Update the account data using necessary id in req.body

- `PUT /accounts`  
  Delete all accounts from database

- `PUT /accounts/:user_id`  
  Delete an account by id from database

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/VizitiuVitalie/express-postgres.git
   cd express-postgres

2. **Install dependencies:**
   ```bash
   npm install

3. **Configure PostgreSQL:**

- Create a PostgreSQL database
- Connect to your database and insert commands from config/db.sql

4. **Set up env variables:**

- Create a `.env` file in the root directory.
- Add the following variables:
```makefile
ACCESS_SECRET_KEY=your_access_secret_key
REFRESH_SECRET_KEY=your_refresh_secret_key
PORT=your_port
DB_PORT=your_db_port
```

5. **Start the server with:**
   ```bash
   npm start
   #for nodemon use this:
   npm run dev

## Features

You can use an HTTP client like Postman to interact with the API endpoints.

## Project Structure

```arduino
RESTAPI_POSTGRES/
├── config/
│   └── db.js                       // Database connection (pool = new Pool).
│   └── db.sql                      // SQL table definitions.
├── controllers/
│   └── account.controller.js       // Retrieves data on request + error handling.
│   └── auth.controller.js          // Only methods related to authentication (register, login, logout).
├── jwt/
│   └── jwt.js                      // Functions for generating access and refresh tokens.
├── middlewares/
│   └── auth.middlewares.js         // Middleware for authenticating requests by checking the presence and validity of JWT tokens in HTTP request headers.
├── models/
│   └── account.model.js            // Account model and toDTO method that returns non-confidential data.
│   └── session.model.js            // Session model and also a toDTO method.
├── repositories/
│   └── account.repo.js             // Layer for database interaction ("accounts" table).
│   └── session.repo.js             // Layer for database interaction ("session_tokens" table).
├── routers/
│   └── account.router.js           // Layer for defining routes for authenticated users.
│   └── auth.router.js              // Authentication routes (.post -> register; .get -> login).
├── services/
│   └── auth.service.js             // Business logic layer (password hashing, account entity creation, token signature verification, etc.).
├── utils/
│   └── hashPassword.js             // Password hashing function.
│   └── verifyPassword.js           // Function for comparing the entered password with the hashed password from the database for validation.
├── index.js                        // Main file.
├── .env                            // Contains secret keys for token generation and signing: ACCESS_SECRET_KEY, REFRESH_SECRET_KEY, as well as PORT and DB_PORT.



