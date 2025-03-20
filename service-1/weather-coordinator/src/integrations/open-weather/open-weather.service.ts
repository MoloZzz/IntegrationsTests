import { Injectable } from '@nestjs/common';
import config from '../../../config'

const openWeatherConfig = config().openApiIntegration;

@Injectable()
export class OpenWeatherService {
    constructor(){}
}
