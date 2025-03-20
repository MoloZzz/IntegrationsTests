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


# Проєкт "Міні-магазин погодних даних"

## Опис проєкту

"Mini Weather Store" — це мікросервісна система, що взаємодіє з зовнішнім API погоди, обробляє дані та передає їх кільком сервісам для додаткової обробки. Кожний сервіс використовує різний тип API та формат даних, що дозволяє застосувати різні техніки взаємодії між сервісами.

---

## Загальна логіка

1. **Service-1 (Координатор погоди):** Запитує дані у зовнішнього API, обробляє їх та передає іншим сервісам.
2. **Service-2 (Конвертатор температури):** Перетворює температуру з Цельсія у Фаренгейт.
3. **Service-3 (Логгер погоди):** Зберігає отримані дані в локальну базу.
4. **Service-4 (Аналітик погоди):** Аналізує отримані дані (наприклад, середню температуру за певний період).
5. **Service-5 (Сповіщувач):** Надсилає повідомлення користувачеві на основі погодних даних.

---

## Опис сервісів

### **Service-1: Координатор погоди**
- **Що робить:**
  - Отримує запит від користувача через REST API.
  - Запитує погодні дані у OpenWeather API.
  - Розподіляє отримані дані між іншими сервісами.
  - Повертає користувачеві базові погодні дані у JSON.
- **API:** REST (JSON).
- **Формати даних:**
  - Запит до OpenWeather: JSON.
  - Запит до Service-2: GraphQL.
  - Запит до Service-3: CSV (REST).
  - Запит до Service-4: SOAP (XML).
  - Запит до Service-5: Plain text (REST).

### **Service-2: Конвертатор температури**
- **Що робить:**
  - Отримує температуру в Цельсіях.
  - Конвертує її у Фаренгейти.
  - Повертає результат у JSON через GraphQL.
- **API:** GraphQL.
- **Формати даних:** JSON.

### **Service-3: Логгер погоди**
- **Що робить:**
  - Отримує погодні дані у форматі CSV.
  - Зберігає їх у локальну SQLite базу.
- **API:** REST (CSV).
- **Формати даних:** CSV.

### **Service-4: Аналітик погоди**
- **Що робить:**
  - Отримує запит у SOAP-форматі.
  - Запитує поточні дані у Service-1.
  - Аналізує їх і повертає XML-відповідь.
- **API:** SOAP.
- **Формати даних:** XML.

### **Service-5: Сповіщувач**
- **Що робить:**
  - Отримує погодні дані у текстовому форматі.
  - Імітує сповіщення користувача.
- **API:** REST (Plain text).
- **Формати даних:** Plain text.

---

## **Приклад сценарію роботи**

1. Користувач робить запит: `GET /weather/Kyiv`.
2. **Service-1**:
   - Запитує OpenWeather API.
   - Надсилає дані до **Service-2**, **Service-3**, **Service-4**, **Service-5**.
   - Повертає користувачу JSON з погодними даними.
3. **Service-2**: Конвертує температуру у Фаренгейти.
4. **Service-3**: Зберігає дані у базу.
5. **Service-4**: Аналізує середню температуру.
6. **Service-5**: Виводить повідомлення користувачу.

---

## **Технологічний стек**
- **Мови:** TypeScript
- **Фреймворк:** NestJS
- **Бази даних:** SQLite (Service-3)
- **Протоколи API:** REST, GraphQL, SOAP
- **Формати даних:** JSON, XML, CSV, Plain text

---

## **Як запустити проєкт**

### Встановлення залежностей
```bash
npm install
```

### Запуск сервісів
```bash
npm run start:service-1
npm run start:service-2
npm run start:service-3
npm run start:service-4
npm run start:service-5
```

---

## **Автори**
- Розробник: MoloZzz
- Ліцензія: MIT 

