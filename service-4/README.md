# Service-4: Weather Analyzer

## Overview
This service analyzes weather data using a SOAP API and returns results in XML. It calculates the average temperature for a city based on data from Service-1.

## Purpose
- Provides analytical insights (e.g., average temperature) for weather data.

## Tech Stack
- **Framework**: NestJS
- **API Type**: SOAP
- **Data Format**: XML
- **Port**: 3003

## Endpoints

### `POST /soap`
- **Description**: SOAP endpoint to retrieve the average temperature for a city.
- **Request Body**:
  ```xml
  <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
      <GetAverageTemperature xmlns="http://example.com/weather">
        <city>Kyiv</city>
      </GetAverageTemperature>
    </soap:Body>
  </soap:Envelope>
  ```
- **Response**:
  ```xml
  <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
      <GetAverageTemperatureResponse xmlns="http://example.com/weather">
        <city>Kyiv</city>
        <averageTemperature>14.8</averageTemperature>
      </GetAverageTemperatureResponse>
    </soap:Body>
  </soap:Envelope>
  ```

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
Use Postman:
```http
POST http://localhost:3003/soap
```

---