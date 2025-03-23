# Service-5 Notificator(Notification Service)

## **Опис**
Service-5 відповідає за сповіщення в системі "Mini Weather Shop". Він отримує події від інших мікросервісів і надсилає сповіщення через різні канали:  
- Telegram  
- Email  
- Slack  
- Консольний вивід  

## **API та Дані**
- **Тип API:** REST (JSON)  
- **Тип даних:** Plain text (для виводу в консоль), JSON (для API запитів)  
- **Вхідні дані:** Запити від інших сервісів (Service-1 — Service-4)  
- **Вихідні дані:** Сповіщення через інтегровані сервіси  

## **Інтеграції**
- **Внутрішні сервіси:**
  - **Service-1 (Weather Fetcher)** – сповіщення про нові дані погоди  
  - **Service-3 (Logger)** – сповіщення про логування погоди  
  - **Service-4 (Analyzer)** – сповіщення про аналітику  

- **Зовнішні API:**  
  - **Telegram Bot API** – відправка повідомлень у Telegram  
  - **SMTP (Gmail, SendGrid, тощо)** – email-сповіщення  
  - **Slack Webhooks** – відправка повідомлень у Slack  
  - **Firebase Cloud Messaging (за необхідності)** – push-сповіщення  

## **REST API**
### **Отримання списку каналів**
GET /channels
**Response:**  
```json
{
  "channels": ["console", "telegram", "email", "slack"]
}
```
### **Відправка сповіщення**
POST /notify
Body:
```json
{
  "channel": "telegram",
  "message": "Нова погода: +20°C"
}
```
Response:
```json
{
  "status": "sent",
  "channel": "telegram"
}
```

## Конфігурація (ENV)
```
PORT=5005
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_chat_id
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email
EMAIL_PASSWORD=your_password
SLACK_WEBHOOK_URL=your_slack_webhook
```
## Технології
- **Fastify** – легковаговий бекенд-фреймворк
- **Axios** – HTTP-запити
- **dotenv** – для конфігурації
- **nodemailer** – для email-сповіщень

## Запуск
```
npm install
npm run start
```