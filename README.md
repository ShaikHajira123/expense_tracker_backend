# Expense Tracker - Backend

## Overview

The backend of the Expense Tracker application handles user authentication, expense data management, and provides API routes for the frontend to interact with. It uses **Node.js**, **Express**, **MongoDB**, and **JWT** for secure authentication.

## Features

- **User Authentication**:
  - Users can sign up and log in to the system.
  - Authentication is done using JWT tokens, and users must be authenticated to access certain routes.
  
- **Expense Management**:
  - Users can create, update, and view their expenses.
  - Expenses are stored in a MongoDB database and categorized based on user input.
  
- **Analytics**:
  - Provides aggregated data to show total expenses by category and month.
  - API endpoints to calculate the percentage of the monthly limit spent in each category.

## Tech Stack

- **Node.js**: For the server-side application.
- **Express.js**: For creating RESTful API routes.
- **MongoDB**: For storing user and expense data.
- **Mongoose**: For modeling the MongoDB database.
- **JWT (JSON Web Token)**: For handling user authentication and authorization.
- **bcryptjs**: For password hashing.
- **dotenv**: For environment variable management.
- **TypeScript**: For type safety.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/ShaikHajira123/expense-tracker-backend.git
    cd expense-tracker-backend
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory with the following content:
    ```bash
    MONGO_URI=mongodb://localhost:27017/tracker # MongoDB URI
    JWT_SECRETKEY=29fb8f4edf20cd0ea268109f8721fccd10836d38b940227d207e6c19597ded55c7223c96785cfd2aef5446d9f6edf07f2d795d68d29b43876c928090afd43f50
    ```

4. Start the development server:
    ```bash
    npm run start:dev
    ```

5. The backend will be running at `http://localhost:3000`.

## Routes

| Route                 | Description                          | Method    |
|-----------------------|--------------------------------------|-----------|
| `/register`    | Register a new user                 | POST      |
| `/login`              | Authenticate user and return JWT    | POST      |
| `/expenses/:id`       | Get, update and delete user expenses| GET/UPDATE/DELETE      |
| `/expenses`           | Create a new expense                | POST      |
| `/analytics/:id`      | Get aggregated data (category and monthly expenses) | GET |

## Usage

1. **User Authentication**:
    - Sign up: Send a POST request to `/register` with the user details (email, password and monthlylimit).
    - Log in: Send a POST request to `/login` with the username and password to receive a JWT token.

2. **Expense Management**:
    - Create Expense: Send a POST request to `/expenses` with expense details (amount, category, description).
    - Get Expenses: Send a GET request to `/expenses/:id` with userId to view all the expenses.

3. **Analytics**:
    - Get aggregated data: Send a GET request to `/analytics/:id` with userId to view the summary of expenses by category and monthly breakdown.

## Development

- To run the backend in development mode with live reloading, you can use `nodemon`:
    ```bash
    npm run start:dev
    ```

- Make sure MongoDB is installed and running. If you’re using a local MongoDB instance, you can start it with the following command:
    ```bash
    mongod
    ```


