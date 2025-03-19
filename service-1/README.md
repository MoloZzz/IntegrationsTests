# Service-1: Weather Coordinator

## Overview
This service acts as the central hub for the "Mini Weather Shop" system. It integrates with the OpenWeather API (REST, JSON) to fetch weather data and coordinates with other services using various API types and data formats.

## Purpose
- Fetches weather data for a specified city.
- Distributes data to other services for processing, logging, analysis, and notifications.

## Tech Stack
- **Framework**: NestJS
- **API Type**: REST
- **Data Format**: JSON
- **Port**: 3000

## Endpoints

### `GET /weather/:city`
- **Description**: Retrieves weather data from OpenWeather API and triggers downstream services.
- **Parameters**:
  - `city` (path, string, required) — The name of the city (e.g., "Kyiv").
- **Response**:
  - **200 OK**: Weather data in JSON format.
    ```json
    {
      "city": "Kyiv",
      "temperature": 15.3,
      "humidity": 80,
      "description": "clear sky"
    }
    ```
  - **400 Bad Request**: If the city is invalid or not found.
    ```json
    { "message": "City not found" }
    ```

## Integrations
- **OpenWeather API**: REST, JSON (external).
- **Service-2**: GraphQL, JSON (temperature conversion).
- **Service-3**: REST, CSV (logging).
- **Service-4**: SOAP, XML (analysis).
- **Service-5**: REST, Plain Text (notifications).

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Add your OpenWeather API key to `.env`:
   ```env
   OPENWEATHER_API_KEY=your-api-key-here
   ```
3. Run the service:
   ```bash
   npm run start:dev
   ```

## Testing
Use Postman:
```http
GET http://localhost:3000/weather/Kyiv
```
