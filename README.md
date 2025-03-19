# IntegrationsTests
Here, I am trying to create a set of microservices with different configurations to practice integrations between them. Service-1 will also integrate with an external API (OpenWeather) to fetch real-world data, while other services will process, log, analyze, and notify based on this data.

The goal is to improve my skills in API integration, data handling, testing, and documentation.

## Project Overview
This project simulates a "Mini Weather Shop" system:
- **Service-1**: Fetches weather data from OpenWeather API and coordinates with other services.
- **Service-2**: Converts temperature data (e.g., Celsius to Fahrenheit).
- **Service-3**: Logs all weather requests to a file or database.
- **Service-4**: Analyzes weather data (e.g., calculates average temperature).
- **Service-5**: Simulates user notifications (e.g., prints to console or sends via Telegram).

## Tech Stack
- **Language**: Python
- **Framework**: FastAPI (for async API development)
- **External API**: OpenWeather (free tier)
- **Testing**: `pytest` (unit tests), Postman (manual testing)
- **Storage**: SQLite (for Service-3 logging), JSON for data exchange
- **Dependencies**: `requests` (for HTTP calls), `pydantic` (for data validation)

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd IntegrationsTests