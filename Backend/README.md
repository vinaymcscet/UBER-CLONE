# User Registration API

## Endpoint: `/users/register`

### Method: POST

### Description:
This endpoint is used to register a new user. It validates the input data, hashes the user's password, creates a new user in the database, and returns a JSON Web Token (JWT) along with the user details.

### Request Body:
The request body should be a JSON object with the following fields:

- `fullname`: An object containing:
  - `firstname` (string, required, minimum length: 3)
  - `lastname` (string, optional, minimum length: 3)
- `email` (string, required, must be a valid email, minimum length: 5)
- `password` (string, required, minimum length: 6)

### Example Response:
- `user` (object):
    - `fullname` (object).
        - `firstname` (string): User's first name (minimum 3 characters). 
        - `lastname` (string): User's last name (minimum 3 characters).
    - `email` (string): User's email address (must be a valid email).
    - `password` (string): User's password (minimum 6 characters).
- `token` (String): JWT Token

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
curl -X POST http://localhost:3000/users/register \
-H "Content-Type: application/json" \
-d '{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}'
```

## Endpoint: `/users/login`

### Method: POST

### Description:
This endpoint is used to log in an existing user. It validates the input data, checks if the user exists, compares the provided password with the stored hashed password, and returns a JSON Web Token (JWT) along with the user details upon successful authentication.

### Request Body:
The request body should be a JSON object with the following fields:

- `email` (string, required, must be a valid email)
- `password` (string, required, minimum length: 6)

### Example Response:
- `user` (object):
    - `_id` (string): User's unique identifier.
    - `fullname` (object):
        - `firstname` (string): User's first name.
        - `lastname` (string): User's last name.
    - `email` (string): User's email address.
- `token` (String): JWT Token

## Endpoint: /users/profile

### Method: GET

### Description:
This endpoint retrieves the profile information of the authenticated user. It uses JWT authentication to verify the user's identity and returns the user details.

### Request Headers:
Authorization: JWT token in the format Bearer <token>

### Example Response:
- `user` (object):
    - `_id` (string): User's unique identifier.
    - `fullname` (object):
        - `firstname` (string): User's first name.
        - `lastname` (string): User's last name.
    - `email` (string): User's email address.

```json
{
  "user": {
    "_id": "65...",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

### Example Usage:

```json
{
curl -X GET http://localhost:3000/users/profile \
-H "Authorization: Bearer <token>"
}
```

### Endpoint: /users/logout

### Method: GET

### Description:
This endpoint logs out the authenticated user by invalidating the JWT token. It clears the token cookie and adds the token to a blacklist to prevent further use.

### Request Headers:

### Authorization: JWT token in the format Bearer <token> (Optional, if token is not in cookies)

### Cookies:
token: JWT token (Optional, if token is in Authorization header)

### Example Response:

```json 
{
  "message": "Logout successfully"
}
```
### Example Usage:
```json 
curl -X GET http://localhost:3000/users/logout \
-H "Authorization: Bearer <token>"
```

## Captain Registration API

### Endpoint: `/captains/register`

### Method: POST

### Description:
This endpoint is used to register a new captain. It validates the input data, hashes the captain's password, creates a new captain in the database, and returns a JSON Web Token (JWT) along with the captain details.

### Request Body:
The request body should be a JSON object with the following fields:

- `captain` (object):
  - `fullname` (object):
    - `firstname` (string, required, minimum length: 3)
    - `lastname` (string, optional, minimum length: 3)
  - `email` (string, required, must be a valid email, minimum length: 5)
  - `password` (string, required, minimum length: 6)
  - `vehicle` (object, required):
    - `color` (string, required)
    - `plate` (string, required)
    - `capacity` (number, required)
    - `vehicleType` (string, required)
  - `token` (String): JWT Token

### Example Request:

```json
{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "red",
    "plate": "ABC-123",
    "capacity": 4,
    "vehicleType": "sedan"
  }
}