import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) { }

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}

	@Get('bonjour')
	getBonjour(): string {
		return this.appService.getBonjour();
	}

	@Get('infos')
	getInfos() {
		return { nom: 'nestjs-corus', version: 1, actif: true };
	}
}
