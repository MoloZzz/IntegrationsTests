# Service-3: Weather Logger

## Overview
This service logs weather data into a SQLite database using a REST API with CSV input. It receives data from Service-1 and stores it for future reference.

## Purpose
- Logs weather data (city, temperature, timestamp) in a structured format.

## Tech Stack
- **Framework**: NestJS
- **API Type**: REST
- **Data Format**: CSV
- **Port**: 3002
- **Storage**: SQLite

## Endpoints

### `POST /log`
- **Description**: Saves weather data provided in CSV format.
- **Request Body**:
  ```csv
  city,temperature,timestamp
  Kyiv,15.3,2025-03-19T12:00:00Z
  ```
- **Response**:
  - **201 Created**: Success message in plain text.
    ```text
    Logged successfully
    ```
  - **400 Bad Request**: If the data is invalid.
    ```text
    Invalid data
    ```

## Integrations
- Receives data from **Service-1** (REST, JSON).

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the service:
   ```bash
   npm run start:dev
   ```
3. SQLite database (`weather_logs.db`) will be created automatically.

## Testing
Use Postman:
```http
POST http://localhost:3002/log
```
Set `Content-Type: text/csv` and send:
```csv
city,temperature,timestamp
Kyiv,15.3,2025-03-19T12:00:00Z
```

---