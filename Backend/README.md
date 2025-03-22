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

```json
{
  "fullname": {
    "firstname": "John", // string, required, minimum length: 3
    "lastname": "Doe" // string, optional, minimum length: 3
  },
  "email": "john.doe@example.com", // string, required, must be a valid email, minimum length: 5
  "password": "password123", // string, required, minimum length: 6
  "vehicle": {
    "color": "red", // string, required
    "plate": "ABC-123", // string, required
    "capacity": 4, // number, required
    "vehicleType": "sedan" // string, required
  }
}
```

### Example Response:
- `captain` (object):
    - `_id` (string): Captain's unique identifier.
    - `fullname` (object):
        - `firstname` (string): Captain's first name.
        - `lastname` (string): Captain's last name.
    - `email` (string): Captain's email address.
    - `vehicle` (object):
        - `color` (string): Vehicle color.
        - `plate` (string): Vehicle plate number.
        - `capacity` (number): Vehicle capacity.
        - `vehicleType` (string): Type of vehicle.
- `token` (String): JWT Token

```json
{
  "token": "JWT_TOKEN",
  "captain": {
    "_id": "captain_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "red",
      "plate": "ABC-123",
      "capacity": 4,
      "vehicleType": "sedan"
    }
  }
}
```
### Example Usage:
```json
curl -X POST http://localhost:3000/captains/register \
-H "Content-Type: application/json" \
-d '{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "red",
    "plate": "ABC-123",
    "capacity": 4,
    "vehicleType": "sedan"
  }
}'
```
### Captain Login API

### Endpoint: /captains/login
### Method: POST
### Description:
    This endpoint is used to log in an existing captain. It validates the input data, checks if the captain exists, compares the provided password with the stored hashed password, and returns a JSON Web Token (JWT) along with the captain details upon successful authentication.

### Request Body:
```json
{
  "email": "john.doe@example.com", // string, required, must be a valid email
  "password": "password123" // string, required, minimum length: 6
}
```
### Example Response:
```json
{
  "token": "JWT_TOKEN",
  "captain": {
    "_id": "captain_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "red",
      "plate": "ABC-123",
      "capacity": 4,
      "vehicleType": "sedan"
    }
  }
}
```
### Example Usage:
```json
  curl -X POST http://localhost:3000/captains/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "password123"
  }'
```
### Captain Profile API

### Endpoint: /captains/profile
### Method: GET
### Description:
    This endpoint retrieves the profile information of the authenticated captain. It uses JWT authentication to verify the captain's identity and returns the captain details.

### Request Headers:
### Authorization: JWT token in the format Bearer <token>

### Example Response:
```json
  {
  "captain": {
    "_id": "captain_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "red",
      "plate": "ABC-123",
      "capacity": 4,
      "vehicleType": "sedan"
    }
  }
}
```

### Example Usage:
```json 
  
  curl -X POST http://localhost:3000/captains/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "password123"
  }
```
### Captain Logout API

### Endpoint: /captains/logout
### Method: GET

### Description:
  This endpoint logs out the authenticated captain by invalidating the JWT token. It clears the token cookie and adds the token to a blacklist to prevent further use.

### Request Headers:
  Authorization: JWT token in the format Bearer <token> (Optional, if token is not in cookies)

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
  curl -X GET http://localhost:3000/captains/logout \
  -H "Authorization: Bearer <token>"
```

## Maps & Rides APIs

### Get Coordinates API
#### Endpoint: `/maps/get-coordinates`
#### Method: GET
#### Description:
Gets the latitude and longitude coordinates for a given address using Google Maps Geocoding API.

#### Request Headers:
- `Authorization`: Bearer token required

#### Query Parameters:
- `address` (string, required, min length: 3): Location address

#### Example Response:
```json
{
  "success": true,
  "coordinates": {
    "latitude": 23.2599,
    "longitude": 77.4126
  }
}
```

### Get Distance & Time API
#### Endpoint: `/maps/get-distance-time`
#### Method: GET
#### Description:
This endpoint calculates the distance and estimated travel time between two locations using the Google Maps Distance Matrix API.

#### Request Headers:
- `Authorization`: Bearer token required

#### Query Parameters:
- `origin` (string, required): Starting location address
- `destination` (string, required): Ending location address

#### Example Response:
```json
{
  "success": true,
  "data": {
    "distance": {
      "text": "5.2 km",
      "meters": 5200
    },
    "duration": {
      "text": "15 mins",
      "seconds": 900
    },
    "origin": "Bhopal Railway Station, Bhopal, MP",
    "destination": "MP Nagar, Bhopal, MP"
  }
}
```

#### Error Responses:
- `400 Bad Request`: If origin or destination parameters are missing
- `401 Unauthorized`: If bearer token is invalid or missing
- `500 Internal Server Error`: If there's an error calculating distance/time

#### Example Usage:
```bash
curl -X GET "http://localhost:3000/maps/get-distance-time?origin=Bhopal Railway Station&destination=MP Nagar" \
-H "Authorization: Bearer <token>"
```

### Get Place Suggestions API
#### Endpoint: `/maps/get-suggestions`
#### Method: GET
#### Description:
Returns place suggestions based on user input text using Google Places Autocomplete API.

#### Request Headers:
- `Authorization`: Bearer token required

#### Query Parameters:
- `input` (string, required, min length: 2): Search text for location suggestions

#### Example Response:
```json
{
  "success": true,
  "predictions": [
    {
      "placeId": "ChIJBVEmP-M9rjsR52LlrCcgHwE",
      "description": "MP Nagar, Bhopal, Madhya Pradesh, India",
      "mainText": "MP Nagar",
      "secondaryText": "Bhopal, Madhya Pradesh, India",
      "location": {
        "latitude": 23.2313,
        "longitude": 77.4326
      },
      "terms": [
        {
          "offset": 0,
          "value": "MP Nagar"
        },
        {
          "offset": 9,
          "value": "Bhopal"
        }
      ],
      "types": [
        "locality",
        "political"
      ]
    }
  ]
}
```

#### Error Responses:
- `400 Bad Request`: If input parameter is missing or too short
- `401 Unauthorized`: If bearer token is invalid or missing
- `500 Internal Server Error`: If there's an error fetching suggestions

#### Example Usage:
```bash
curl -X GET "http://localhost:3000/maps/get-suggestions?input=MP Nagar" \
-H "Authorization: Bearer <token>"
```

### Create Ride API
#### Endpoint: `/rides/create`
#### Method: POST
#### Description:
Creates a new ride request with specified pickup location, destination, and vehicle type. Generates a unique OTP for ride verification.

#### Request Headers:
- `Authorization`: Bearer token required

#### Request Body:
```json
{
  "pickup": "Bhopal Railway Station",
  "destination": "MP Nagar",
  "vehicleType": "car"  // Possible values: "auto", "car", "moto"
}
```

#### Example Response:
```json
{
  "success": true,
  "ride": {
    "_id": "ride_id",
    "user": "user_id",
    "pickup": "Bhopal Railway Station",
    "destination": "MP Nagar",
    "fare": 230.75,
    "status": "PENDING",
    "vehicleType": "car",
    "otp": "123456",
    "createdAt": "2024-03-20T10:30:00.000Z",
    "updatedAt": "2024-03-20T10:30:00.000Z"
  }
}
```

#### Error Responses:
- `400 Bad Request`: If required fields are missing or invalid
- `401 Unauthorized`: If bearer token is invalid or missing
- `500 Internal Server Error`: If there's an error creating the ride

#### Example Usage:
```bash
curl -X POST "http://localhost:3000/rides/create" \
-H "Authorization: Bearer <token>" \
-H "Content-Type: application/json" \
-d '{
  "pickup": "Bhopal Railway Station",
  "destination": "MP Nagar",
  "vehicleType": "car"
}'
```


## Get Fare Estimation API

### Endpoint: `/rides/get-fare`

### Method: GET 

### Description:
This endpoint calculates the estimated fare for a ride based on pickup location, destination, and returns fare estimates for all vehicle types (auto, car, moto). It uses distance and duration from the Google Maps API for calculations.

### Request Headers:
- `Authorization`: Bearer token required

### Query Parameters:
- `pickup` (string, required): Pickup location address
- `destination` (string, required): Destination location address

### Example Response:
```json
{
  "auto": 150.50,    // Base fare (₹30) + ₹10/km + ₹2/min
  "car": 230.75,     // Base fare (₹50) + ₹15/km + ₹3/min
  "moto": 95.25      // Base fare (₹20) + ₹8/km + ₹1.5/min
}
```
### Example Response:
```json

curl -X GET "http://localhost:3000/rides/get-fare?pickup=Bhopal Railway Station&destination=MP Nagar" \
-H "Authorization: Bearer <token>"

```
