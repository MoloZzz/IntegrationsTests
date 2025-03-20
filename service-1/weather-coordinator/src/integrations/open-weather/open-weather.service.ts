import { Injectable } from '@nestjs/common';


@Injectable()
export class OpenWeatherService {
    constructor(){
        const mainUrl = `lat={lat}&lon={lon}&appid={API key}`
    }
}
