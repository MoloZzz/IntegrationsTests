import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
    path: path.join(process.cwd(), `service-core/.env`),
});

export default () => ({
    openApiIntegration: {
        url: process.env.POSTGRES_HOST,
    },
});
