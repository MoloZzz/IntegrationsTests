import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
    path: path.join(process.cwd(), `service-core/.env`),
});

export default () => ({
    openApiIntegration: {
        url: process.env.OPEN_WEATHER_API_URL,
        apiKey: process.env.OPEN_WEATHER_API_KEY, 
    },
});
