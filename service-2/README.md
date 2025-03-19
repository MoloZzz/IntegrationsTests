# Service-2: Temperature Converter

## Overview
This service converts temperature from Celsius to Fahrenheit using a GraphQL API. It receives requests from Service-1 and returns the converted data in JSON.

## Purpose
- Provides temperature conversion functionality for weather data.

## Tech Stack
- **Framework**: NestJS (with Apollo Server)
- **API Type**: GraphQL
- **Data Format**: JSON
- **Port**: 3001

## Endpoints

### `POST /graphql`
- **Description**: GraphQL endpoint to convert temperature.
- **Query Example**:
  ```graphql
  query {
    convertTemperature(celsius: 15.3) {
      celsius
      fahrenheit
    }
  }
  ```
- **Response**:
  ```json
  {
    "data": {
      "convertTemperature": {
        "celsius": 15.3,
        "fahrenheit": 59.54
      }
    }
  }
  ```
  - **400 Bad Request**: If the temperature is invalid.
    ```json
    { "errors": [{ "message": "Invalid temperature" }] }
    ```

## Integrations
- Receives requests from **Service-1** (REST, JSON).

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

---