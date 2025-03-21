# Service-2: GeoData Service

## Overview
This service manages geographic data, storing and retrieving city coordinates using a GraphQL API. It interacts with Service-1 to provide location-based data.

## Purpose
- Stores and retrieves city coordinates.
- Ensures efficient geographic data handling.
- Supports Service-1 in weather-related queries.

## Tech Stack
- **Framework**: NestJS (with Apollo Server)
- **Database**: PostgreSQL (via Prisma ORM)
- **API Type**: GraphQL
- **Data Format**: JSON
- **Port**: 3001

## Endpoints

### `POST /graphql`

#### Query: Get City Coordinates
- **Description**: Fetches coordinates for a given city.
- **Example Request**:
  ```graphql
  query {
    getCityCoordinates(name: "Kyiv") {
      name
      latitude
      longitude
    }
  }
  ```
- **Response**:
  ```json
  {
    "data": {
      "getCityCoordinates": {
        "name": "Kyiv",
        "latitude": 50.45,
        "longitude": 30.52
      }
    }
  }
  ```
- **404 Not Found**: If the city is not in the database.
  ```json
  { "errors": [{ "message": "City not found" }] }
  ```

#### Mutation: Add City Coordinates
- **Description**: Adds a new city with coordinates.
- **Example Request**:
  ```graphql
  mutation {
    addCity(name: "Lviv", latitude: 49.84, longitude: 24.03) {
      name
      latitude
      longitude
    }
  }
  ```
- **Response**:
  ```json
  {
    "data": {
      "addCity": {
        "name": "Lviv",
        "latitude": 49.84,
        "longitude": 24.03
      }
    }
  }
  ```
- **400 Bad Request**: If input data is invalid.
  ```json
  { "errors": [{ "message": "Invalid data" }] }
  ```

## Integrations
- Receives requests from **Service-1** (REST, JSON).
- Stores city data in **PostgreSQL**.

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the service:
   ```bash
   npm run start:dev
   ```

## Testing
Use GraphQL Playground at:
```http
http://localhost:3001/graphql
```

