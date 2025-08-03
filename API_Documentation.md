# Grin Backend API Documentation

This document provides a reference for the Grin Backend API, detailing available endpoints, request/response formats, and authentication requirements.

## Base URL

All API endpoints are prefixed with `/api`.

## Authentication

This API uses JSON Web Tokens (JWT) for authentication. After successful login, a JWT will be returned in the response body. This token must be included in the `x-auth-token` header for all protected routes.

**Header Example for Protected Routes:**
`x-auth-token: <YOUR_JWT_TOKEN>`

---

### 1. Authentication Endpoints

#### 1.1. User/Admin Login

*   **URL:** `/api/auth/login`
*   **Method:** `POST`
*   **Description:** Authenticates a user or admin and returns a JWT.
*   **Authentication:** None required.
*   **Request Body (JSON):**
    ```json
    {
      "email": "test@example.com",
      "password": "password123"
    }
    ```
*   **Response Body (JSON - Success):**
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU0YjY3ODkwMTIzNDU2Nzg5MDEyMzQ1Iiwicm9sZSI6InVzZXIifSwiaWF0IjoxNjU0OTA5MjA2LCJleHAiOjE2NTQ5MTI4MDZ9.some_very_long_signature"
    }
    ```
*   **Response Body (JSON - Error):**
    ```json
    {
      "message": "Invalid credentials"
    }
    ```

---

### 2. Admin Endpoints

#### 2.1. Create Admin

*   **URL:** `/api/admins`
*   **Method:** `POST`
*   **Description:** Creates a new admin user.
*   **Authentication:** None required (for initial admin creation).
*   **Request Body (JSON):**
    ```json
    {
      "name": "Admin Name",
      "email": "admin@example.com",
      "password": "adminpassword",
      "city": "Freetown"
    }
    ```
*   **Response Body (JSON - Success):**
    ```json
    {
      "message": "Admin created successfully"
    }
    ```

#### 2.2. Update Admin

*   **URL:** `/api/admins/:id`
*   **Method:** `PUT`
*   **Description:** Updates an existing admin's details.
*   **Authentication:** Required.
*   **Request Body (JSON):**
    ```json
    {
      "name": "Updated Admin Name",
      "email": "updated_admin@example.com",
      "city": "Bo"
    }
    ```
*   **Response Body (JSON - Success):**
    ```json
    {
      "message": "Admin updated successfully",
      "admin": {
        "_id": "654b67890123456789012345",
        "name": "Updated Admin Name",
        "email": "updated_admin@example.com",
        "city": "Bo",
        "createdAt": "2023-01-01T12:00:00.000Z",
        "updatedAt": "2023-01-01T13:00:00.000Z"
      }
    }
    ```

#### 2.3. Delete Admin

*   **URL:** `/api/admins/:id`
*   **Method:** `DELETE`
*   **Description:** Deletes an admin user.
*   **Authentication:** Required.
*   **Response Body (JSON - Success):**
    ```json
    {
      "message": "Admin deleted successfully"
    }
    ```

---

### 3. User Endpoints

#### 3.1. Create User

*   **URL:** `/api/users`
*   **Method:** `POST`
*   **Description:** Creates a new user.
*   **Authentication:** None required.
*   **Request Body (JSON):**
    ```json
    {
      "fullName": "John Doe",
      "email": "john.doe@example.com",
      "password": "userpassword",
      "phoneNumber": "123-456-7890",
      "location": "Freetown"
    }
    ```
*   **Response Body (JSON - Success):**
    ```json
    {
      "message": "User created successfully"
    }
    ```

#### 3.2. Get All Users

*   **URL:** `/api/users`
*   **Method:** `GET`
*   **Description:** Retrieves a list of all users.
*   **Authentication:** Required.
*   **Response Body (JSON - Success):**
    ```json
    [
      {
        "_id": "654b67890123456789012345",
        "fullName": "John Doe",
        "email": "john.doe@example.com",
        "phoneNumber": "123-456-7890",
        "location": "Freetown",
        "hearts": 0,
        "createdAt": "2023-01-01T12:00:00.000Z",
        "updatedAt": "2023-01-01T12:00:00.000Z"
      }
    ]
    ```

#### 3.3. Get User by ID

*   **URL:** `/api/users/:id`
*   **Method:** `GET`
*   **Description:** Retrieves a single user by their ID.
*   **Authentication:** Required.
*   **Response Body (JSON - Success):**
    ```json
    {
      "_id": "654b67890123456789012345",
      "fullName": "John Doe",
      "email": "john.doe@example.com",
      "phoneNumber": "123-456-7890",
      "location": "Freetown",
      "hearts": 0,
      "createdAt": "2023-01-01T12:00:00.000Z",
      "updatedAt": "2023-01-01T12:00:00.000Z"
    }
    ```

#### 3.4. Update User

*   **URL:** `/api/users/:id`
*   **Method:** `PUT`
*   **Description:** Updates an existing user's details.
*   **Authentication:** Required.
*   **Request Body (JSON):**
    ```json
    {
      "fullName": "Jane Doe",
      "email": "jane.doe@example.com",
      "phoneNumber": "987-654-3210",
      "location": "Bo"
    }
    ```
*   **Response Body (JSON - Success):**
    ```json
    {
      "message": "User updated successfully",
      "user": {
        "_id": "654b67890123456789012345",
        "fullName": "Jane Doe",
        "email": "jane.doe@example.com",
        "phoneNumber": "987-654-3210",
        "location": "Bo",
        "hearts": 0,
        "createdAt": "2023-01-01T12:00:00.000Z",
        "updatedAt": "2023-01-01T13:00:00.000Z"
      }
    }
    ```

#### 3.5. Delete User

*   **URL:** `/api/users/:id`
*   **Method:** `DELETE`
*   **Description:** Deletes a user.
*   **Authentication:** Required.
*   **Response Body (JSON - Success):**
    ```json
    {
      "message": "User deleted successfully"
    }
    ```

---

### 4. Driver Endpoints

#### 4.1. Create Driver

*   **URL:** `/api/drivers`
*   **Method:** `POST`
*   **Description:** Creates a new driver.
*   **Authentication:** None required.
*   **Request Body (JSON):**
    ```json
    {
      "fullName": "Driver One",
      "email": "driver1@example.com",
      "password": "driverpassword",
      "cityCouncilId": "654b67890123456789012345"
    }
    ```
*   **Response Body (JSON - Success):**
    ```json
    {
      "message": "Driver created successfully"
    }
    ```

#### 4.2. Get All Drivers

*   **URL:** `/api/drivers`
*   **Method:** `GET`
*   **Description:** Retrieves a list of all drivers.
*   **Authentication:** Required.
*   **Response Body (JSON - Success):**
    ```json
    [
      {
        "_id": "654b67890123456789012345",
        "fullName": "Driver One",
        "email": "driver1@example.com",
        "cityCouncilId": "654b67890123456789012345",
        "createdAt": "2023-01-01T12:00:00.000Z",
        "updatedAt": "2023-01-01T12:00:00.000Z"
      }
    ]
    ```

#### 4.3. Get Driver by ID

*   **URL:** `/api/drivers/:id`
*   **Method:** `GET`
*   **Description:** Retrieves a single driver by their ID.
*   **Authentication:** Required.
*   **Response Body (JSON - Success):**
    ```json
    {
      "_id": "654b67890123456789012345",
      "fullName": "Driver One",
      "email": "driver1@example.com",
      "cityCouncilId": "654b67890123456789012345",
      "createdAt": "2023-01-01T12:00:00.000Z",
      "updatedAt": "2023-01-01T12:00:00.000Z"
    }
    ```

#### 4.4. Update Driver

*   **URL:** `/api/drivers/:id`
*   **Method:** `PUT`
*   **Description:** Updates an existing driver's details.
*   **Authentication:** Required.
*   **Request Body (JSON):**
    ```json
    {
      "fullName": "Driver Two",
      "email": "driver2@example.com",
      "cityCouncilId": "654b67890123456789012345"
    }
    ```
*   **Response Body (JSON - Success):**
    ```json
    {
      "message": "Driver updated successfully",
      "driver": {
        "_id": "654b67890123456789012345",
        "fullName": "Driver Two",
        "email": "driver2@example.com",
        "cityCouncilId": "654b67890123456789012345",
        "createdAt": "2023-01-01T12:00:00.000Z",
        "updatedAt": "2023-01-01T13:00:00.000Z"
      }
    }
    ```

#### 4.5. Delete Driver

*   **URL:** `/api/drivers/:id`
*   **Method:** `DELETE`
*   **Description:** Deletes a driver.
*   **Authentication:** Required.
*   **Response Body (JSON - Success):**
    ```json
    {
      "message": "Driver deleted successfully"
    }
    ```

---

### 5. Product Endpoints

#### 5.1. Create Product

*   **URL:** `/api/products`
*   **Method:** `POST`
*   **Description:** Creates a new product.
*   **Authentication:** Required.
*   **Request Body (JSON):**
    ```json
    {
      "title": "Organic Rice",
      "smeId": "654b67890123456789012345",
      "description": "Locally sourced organic rice.",
      "quantity": 100,
      "status": "Available"
    }
    ```
*   **Response Body (JSON - Success):**
    ```json
    {
      "message": "Product created successfully"
    }
    ```

#### 5.2. Get All Products

*   **URL:** `/api/products`
*   **Method:** `GET`
*   **Description:** Retrieves a list of all products.
*   **Authentication:** Required.
*   **Response Body (JSON - Success):**
    ```json
    [
      {
        "_id": "654b67890123456789012345",
        "title": "Organic Rice",
        "smeId": "654b67890123456789012345",
        "description": "Locally sourced organic rice.",
        "quantity": 100,
        "status": "Available",
        "createdAt": "2023-01-01T12:00:00.000Z",
        "updatedAt": "2023-01-01T12:00:00.000Z"
      }
    ]
    ```

#### 5.3. Get Product by ID

*   **URL:** `/api/products/:id`
*   **Method:** `GET`
*   **Description:** Retrieves a single product by its ID.
*   **Authentication:** Required.
*   **Response Body (JSON - Success):**
    ```json
    {
      "_id": "654b67890123456789012345",
      "title": "Organic Rice",
      "smeId": "654b67890123456789012345",
      "description": "Locally sourced organic rice.",
      "quantity": 100,
      "status": "Available",
      "createdAt": "2023-01-01T12:00:00.000Z",
      "updatedAt": "2023-01-01T12:00:00.000Z"
    }
    ```

#### 5.4. Update Product

*   **URL:** `/api/products/:id`
*   **Method:** `PUT`
*   **Description:** Updates an existing product's details.
*   **Authentication:** Required.
*   **Request Body (JSON):**
    ```json
    {
      "title": "Fresh Vegetables",
      "description": "Assorted fresh vegetables.",
      "quantity": 50,
      "status": "Not Available"
    }
    ```
*   **Response Body (JSON - Success):**
    ```json
    {
      "message": "Product updated successfully",
      "product": {
        "_id": "654b67890123456789012345",
        "title": "Fresh Vegetables",
        "smeId": "654b67890123456789012345",
        "description": "Assorted fresh vegetables.",
        "quantity": 50,
        "status": "Not Available",
        "createdAt": "2023-01-01T12:00:00.000Z",
        "updatedAt": "2023-01-01T13:00:00.000Z"
      }
    }
    ```

#### 5.5. Delete Product

*   **URL:** `/api/products/:id`
*   **Method:** `DELETE`
*   **Description:** Deletes a product.
*   **Authentication:** Required.
*   **Response Body (JSON - Success):**
    ```json
    {
      "message": "Product deleted successfully"
    }
    ```

---

### 6. Request Endpoints

#### 6.1. Create Request

*   **URL:** `/api/requests`
*   **Method:** `POST`
*   **Description:** Creates a new request (e.g., pickup, report).
*   **Authentication:** Required.
*   **Request Body (JSON):**
    ```json
    {
      "title": "Waste Pickup Request",
      "image": "http://example.com/image.jpg",
      "userId": "654b67890123456789012345",
      "location": "Freetown",
      "requestType": "Pickup"
    }
    ```
*   **Response Body (JSON - Success):**
    ```json
    {
      "message": "Request created successfully"
    }
    ```

#### 6.2. Get All Requests

*   **URL:** `/api/requests`
*   **Method:** `GET`
*   **Description:** Retrieves a list of all requests.
*   **Authentication:** Required.
*   **Response Body (JSON - Success):**
    ```json
    [
      {
        "_id": "654b67890123456789012345",
        "title": "Waste Pickup Request",
        "image": "http://example.com/image.jpg",
        "userId": "654b67890123456789012345",
        "location": "Freetown",
        "status": "pending",
        "requestType": "Pickup",
        "createdAt": "2023-01-01T12:00:00.000Z",
        "updatedAt": "2023-01-01T12:00:00.000Z"
      }
    ]
    ```

#### 6.3. Get Request by ID

*   **URL:** `/api/requests/:id`
*   **Method:** `GET`
*   **Description:** Retrieves a single request by its ID.
*   **Authentication:** Required.
*   **Response Body (JSON - Success):**
    ```json
    {
      "_id": "654b67890123456789012345",
      "title": "Waste Pickup Request",
      "image": "http://example.com/image.jpg",
      "userId": "654b67890123456789012345",
      "location": "Freetown",
      "status": "pending",
      "requestType": "Pickup",
      "createdAt": "2023-01-01T12:00:00.000Z",
      "updatedAt": "2023-01-01T12:00:00.000Z"
    }
    ```

#### 6.4. Update Request

*   **URL:** `/api/requests/:id`
*   **Method:** `PUT`
*   **Description:** Updates an existing request's details.
*   **Authentication:** Required.
*   **Request Body (JSON):**
    ```json
    {
      "title": "Updated Pickup Request",
      "location": "Bo",
      "status": "assigned",
      "assignedDriver": "654b67890123456789012346",
      "requestType": "Pickup"
    }
    ```
*   **Response Body (JSON - Success):**
    ```json
    {
      "message": "Request updated successfully",
      "request": {
        "_id": "654b67890123456789012345",
        "title": "Updated Pickup Request",
        "image": "http://example.com/image.jpg",
        "userId": "654b67890123456789012345",
        "location": "Bo",
        "status": "assigned",
        "assignedDriver": "654b67890123456789012346",
        "requestType": "Pickup",
        "createdAt": "2023-01-01T12:00:00.000Z",
        "updatedAt": "2023-01-01T13:00:00.000Z"
      }
    }
    ```

#### 6.5. Delete Request

*   **URL:** `/api/requests/:id`
*   **Method:** `DELETE`
*   **Description:** Deletes a request.
*   **Authentication:** Required.
*   **Response Body (JSON - Success):**
    ```json
    {
      "message": "Request deleted successfully"
    }
    ```

---

### 7. SME Endpoints

#### 7.1. Create SME

*   **URL:** `/api/smes`
*   **Method:** `POST`
*   **Description:** Creates a new Small and Medium Enterprise (SME).
*   **Authentication:** Required.
*   **Request Body (JSON):**
    ```json
    {
      "name": "Local Farm Produce",
      "owner": {
        "name": "Alice Smith",
        "phone": "111-222-3333",
        "location": "Makeni"
      }
    }
    ```
*   **Response Body (JSON - Success):**
    ```json
    {
      "message": "SME created successfully"
    }
    ```

#### 7.2. Get All SMEs

*   **URL:** `/api/smes`
*   **Method:** `GET`
*   **Description:** Retrieves a list of all SMEs.
*   **Authentication:** Required.
*   **Response Body (JSON - Success):**
    ```json
    [
      {
        "_id": "654b67890123456789012345",
        "name": "Local Farm Produce",
        "owner": {
          "name": "Alice Smith",
          "phone": "111-222-3333",
          "location": "Makeni"
        },
        "createdAt": "2023-01-01T12:00:00.000Z",
        "updatedAt": "2023-01-01T12:00:00.000Z"
      }
    ]
    ```

#### 7.3. Get SME by ID

*   **URL:** `/api/smes/:id`
*   **Method:** `GET`
*   **Description:** Retrieves a single SME by its ID.
*   **Authentication:** Required.
*   **Response Body (JSON - Success):**
    ```json
    {
      "_id": "654b67890123456789012345",
      "name": "Local Farm Produce",
      "owner": {
        "name": "Alice Smith",
        "phone": "111-222-3333",
        "location": "Makeni"
      },
      "createdAt": "2023-01-01T12:00:00.000Z",
      "updatedAt": "2023-01-01T12:00:00.000Z"
    }
    ```

#### 7.4. Update SME

*   **URL:** `/api/smes/:id`
*   **Method:** `PUT`
*   **Description:** Updates an existing SME's details.
*   **Authentication:** Required.
*   **Request Body (JSON):**
    ```json
    {
      "name": "Green Grocers",
      "owner": {
        "name": "Bob Johnson",
        "phone": "444-555-6666",
        "location": "Bo"
      }
    }
    ```
*   **Response Body (JSON - Success):**
    ```json
    {
      "message": "SME updated successfully",
      "sme": {
        "_id": "654b67890123456789012345",
        "name": "Green Grocers",
        "owner": {
          "name": "Bob Johnson",
          "phone": "444-555-6666",
          "location": "Bo"
        },
        "createdAt": "2023-01-01T12:00:00.000Z",
        "updatedAt": "2023-01-01T13:00:00.000Z"
      }
    }
    ```

#### 7.5. Delete SME

*   **URL:** `/api/smes/:id`
*   **Method:** `DELETE`
*   **Description:** Deletes an SME.
*   **Authentication:** Required.
*   **Response Body (JSON - Success):**
    ```json
    {
      "message": "SME deleted successfully"
    }
    ```

---

### 8. Vehicle Endpoints

#### 8.1. Create Vehicle

*   **URL:** `/api/vehicles`
*   **Method:** `POST`
*   **Description:** Creates a new vehicle.
*   **Authentication:** Required.
*   **Request Body (JSON):**
    ```json
    {
      "name": "Truck 001",
      "type": "Truck",
      "driver": "654b67890123456789012345",
      "cityCouncilId": "654b67890123456789012346",
      "status": "In Service"
    }
    ```
*   **Response Body (JSON - Success):**
    ```json
    {
      "message": "Vehicle created successfully"
    }
    ```

#### 8.2. Get All Vehicles

*   **URL:** `/api/vehicles`
*   **Method:** `GET`
*   **Description:** Retrieves a list of all vehicles.
*   **Authentication:** Required.
*   **Response Body (JSON - Success):**
    ```json
    [
      {
        "_id": "654b67890123456789012345",
        "name": "Truck 001",
        "type": "Truck",
        "driver": "654b67890123456789012345",
        "cityCouncilId": "654b67890123456789012346",
        "status": "In Service",
        "createdAt": "2023-01-01T12:00:00.000Z",
        "updatedAt": "2023-01-01T12:00:00.000Z"
      }
    ]
    ```

#### 8.3. Get Vehicle by ID

*   **URL:** `/api/vehicles/:id`
*   **Method:** `GET`
*   **Description:** Retrieves a single vehicle by its ID.
*   **Authentication:** Required.
*   **Response Body (JSON - Success):**
    ```json
    {
      "_id": "654b67890123456789012345",
      "name": "Truck 001",
      "type": "Truck",
      "driver": "654b67890123456789012345",
      "cityCouncilId": "654b67890123456789012346",
      "status": "In Service",
      "createdAt": "2023-01-01T12:00:00.000Z",
      "updatedAt": "2023-01-01T12:00:00.000Z"
    }
    ```

#### 8.4. Update Vehicle

*   **URL:** `/api/vehicles/:id`
*   **Method:** `PUT`
*   **Description:** Updates an existing vehicle's details.
*   **Authentication:** Required.
*   **Request Body (JSON):**
    ```json
    {
      "name": "Tricycle 002",
      "type": "Tricycle",
      "driver": "654b67890123456789012347",
      "cityCouncilId": "654b67890123456789012346",
      "status": "Out of Service"
    }
    ```
*   **Response Body (JSON - Success):**
    ```json
    {
      "message": "Vehicle updated successfully",
      "vehicle": {
        "_id": "654b67890123456789012345",
        "name": "Tricycle 002",
        "type": "Tricycle",
        "driver": "654b67890123456789012347",
        "cityCouncilId": "654b67890123456789012346",
        "status": "Out of Service",
        "createdAt": "2023-01-01T12:00:00.000Z",
        "updatedAt": "2023-01-01T13:00:00.000Z"
      }
    }
    ```

#### 8.5. Delete Vehicle

*   **URL:** `/api/vehicles/:id`
*   **Method:** `DELETE`
*   **Description:** Deletes a vehicle.
*   **Authentication:** Required.
*   **Response Body (JSON - Success):**
    ```json
    {
      "message": "Vehicle deleted successfully"
    }
    ```
