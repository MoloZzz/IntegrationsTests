# IntegrationsTests
Here, I am trying to create a set of microservices with different configurations to practice integrations between them. Service-1 will also integrate with an external API (OpenWeather) to fetch real-world data, while other services will process, log, analyze, and notify based on this data.

The goal is to improve my skills in API integration, data handling, testing, and documentation.

This project is a TypeScript-based experiment to practice API integrations between microservices. It includes five services that interact with each other and an external API (OpenWeather) to fetch and process weather data.

The goal is to enhance skills in TypeScript, NestJS, API design, integration, and testing.

## Project Overview
A "Mini Weather Shop" system:
- **Service-1**: Fetches weather data from OpenWeather and coordinates with other services (NestJS).
- **Service-2**: Converts temperature (Celsius to Fahrenheit) (NestJS).
- **Service-3**: Logs weather requests to SQLite (NestJS).
- **Service-4**: Analyzes data (e.g., average temperature) (NestJS).
- **Service-5**: Simulates notifications (e.g., console output) (Fastify).

## Tech Stack
- **Language**: TypeScript
- **Frameworks**: NestJS (Service-1 to Service-4), Fastify (Service-5)
- **External API**: OpenWeather (free tier)
- **Testing**: Jest (unit tests), Postman (manual testing)
- **Storage**: SQLite (via TypeORM for Service-3), JSON for data exchange
- **Dependencies**: `axios` (HTTP requests), `dotenv` (environment variables)

## Configuration Stack
- **Service-1**: Використовує REST і JSON (зовнішній OpenWeather API повертає JSON).
- **Service-2**: Використовує GraphQL і JSON (GraphQL зазвичай працює з JSON).
- **Service-3**: Використовує REST і CSV (логи у вигляді таблиці).
- **Service-4**: Використовує SOAP і XML (аналітика в стилі старіших систем).
- **Service-5**: Використовує REST і plain text (сповіщення як простий текст).