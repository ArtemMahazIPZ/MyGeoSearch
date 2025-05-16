# MyGeoSearch

## Overview

MyGeoSearch is a web application designed to manage geographical data, including users, types, categories, and locations. It features a backend built with Node.js and a frontend built with React using Vite.
For working with API I used Postman.

## Installation and Setup

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- MySQL Server

### Backend Setup

1. **Navigate to the `backend` directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file:**
   - In the `backend` directory, create a `.env` file with the following structure (replace placeholders with your values):
     ```plaintext
     PORT=5000
     DB_HOST=localhost
     DB_USER=your_username
     DB_PASSWORD=your_password
     DB_NAME=GeoSearchDB
     JWT_SECRET=your_jwt_secret
     ```

4. **Set up the MySQL database:**
   - Create a database named `GeoSearchDB`:
     ```sql
     CREATE DATABASE GeoSearchDB;
     ```
   - Create the following tables:

     - **`types` table:**
       ```sql
       CREATE TABLE types (
           id INT NOT NULL AUTO_INCREMENT,
           name VARCHAR(255) NOT NULL,
           PRIMARY KEY (id)
       );
       ```

     - **`categories` table:**
       ```sql
       CREATE TABLE categories (
           id INT NOT NULL AUTO_INCREMENT,
           type_id INT NOT NULL,
           name VARCHAR(255) NOT NULL,
           PRIMARY KEY (id),
           FOREIGN KEY (type_id) REFERENCES types(id)
       );
       ```

     - **`locations` table:**
       ```sql
       CREATE TABLE locations (
           id INT NOT NULL AUTO_INCREMENT,
           type_id INT NOT NULL,
           category_id INT NOT NULL,
           coordinates POINT NOT NULL,
           photo_url VARCHAR(255),
           description TEXT,
           work_hours VARCHAR(255),
           PRIMARY KEY (id),
           FOREIGN KEY (type_id) REFERENCES types(id),
           FOREIGN KEY (category_id) REFERENCES categories(id)
       );
       ```

     - **`users` table:**
       ```sql
       CREATE TABLE users (
           id INT NOT NULL AUTO_INCREMENT,
           phone_number VARCHAR(15) NOT NULL UNIQUE,
           name VARCHAR(100),
           surname VARCHAR(100),
           otp_code VARCHAR(6),
           role ENUM('admin', 'user') DEFAULT 'user',
           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
           PRIMARY KEY (id)
       );
       ```

5. **Start the backend server:**
   ```bash
   npm start
   ```

### Frontend Setup

1. **Navigate to the `dashboard` directory:**
   ```bash
   cd dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the frontend development server:**
   ```bash
   npm run dev
   ```

## Basic Commands

### Backend
- **`npm start`**: Starts the backend server.
- **`npm test`**: Runs backend tests (if configured).

### Frontend
- **`npm run dev`**: Starts the Vite development server.
- **`npm run build`**: Builds the frontend for production.
- **`npm run preview`**: Previews the production build.
- **`npm run storybook`**: Starts Storybook for component development.

## API Endpoints (Postman)

The following API endpoints are available for testing via Postman. The base URL is `http://localhost:5000/api` (adjust based on your `PORT` setting in the `.env` file).

### Authentication and User Management
- **POST OTP Generation**
  - **Method**: `POST`
  - **Endpoint**: `/api/auth/send-otp`
  - **Description**: Generates an OTP for a user based on their phone number.
  - **Example Request Body**:
    ```json
    {
        "phone_number": "1234567890"
    }
    ```

- **POST Fetch Registered Users**
  - **Method**: `POST`
  - **Endpoint**: `/api/auth/users`
  - **Description**: Fetches registered users, potentially with filters.
  - **Example Request Body**:
    ```json
    {
        "phone_number": "1234567890"
    }
    ```

- **POST Verify OTP**
  - **Method**: `POST`
  - **Endpoint**: `/api/auth/verify-otp`
  - **Description**: Verifies the OTP for a user to authenticate them.
  - **Example Request Body**:
    ```json
    {
        "phone_number": "1234567890",
        "otp_code": "123456"
    }
    ```

- **GET Get All Users**
  - **Method**: `GET`
  - **Endpoint**: `/api/users`
  - **Description**: Retrieves a list of all users.

- **PATCH Update User**
  - **Method**: `PATCH`
  - **Endpoint**: `/api/users/{id}`
  - **Description**: Updates a user’s details by ID.
  - **Example Request Body**:
    ```json
    {
        "name": "John",
        "surname": "Doe"
    }
    ```

- **DEL Delete User**
  - **Method**: `DELETE`
  - **Endpoint**: `/api/users/{id}`
  - **Description**: Deletes a user by ID.

### Type Management
- **POST Create a New Type**
  - **Method**: `POST`
  - **Endpoint**: `/api/types`
  - **Description**: Creates a new type.
  - **Example Request Body**:
    ```json
    {
        "name": "Historical"
    }
    ```

- **GET Get All Types**
  - **Method**: `GET`
  - **Endpoint**: `/api/types`
  - **Description**: Retrieves a list of all types.

### Location Management
- **GET Get All Locations**
  - **Method**: `GET`
  - **Endpoint**: `/api/locations`
  - **Description**: Retrieves a list of all locations.

- **PATCH Update Location**
  - **Method**: `PATCH`
  - **Endpoint**: `/api/locations/{id}`
  - **Description**: Updates a location by ID.
  - **Example Request Body**:
    ```json
    {
        "description": "Updated description",
        "work_hours": "9 AM - 5 PM"
    }
    ```

- **POST Post New Locations**
  - **Method**: `POST`
  - **Endpoint**: `/api/locations`
  - **Description**: Creates a new location.
  - **Example Request Body**:
    ```json
    {
        "type_id": 1,
        "category_id": 1,
        "coordinates": "POINT(40.7128 -74.0060)",
        "photo_url": "http://example.com/photo.jpg",
        "description": "A new location",
        "work_hours": "9 AM - 5 PM"
    }
    ```

### Category Management
- **GET Get All Category**
  - **Method**: `GET`
  - **Endpoint**: `/api/categories`
  - **Description**: Retrieves a list of all categories.

## License

This project is licensed under the [MIT License](LICENSE.md). See the `LICENSE.md` file for details.

## Authorship

- **Author**: Artem Mahaz
- **Email**: ipz221_mao@student.ztu.edu.ua
- **GitHub**: ArtemMahazIPZ

## Additional Resources

- [Privacy Policy](PRIVACY_POLICY.md)

## Last Updated

07:32 PM EEST, Friday, May 16, 2025
