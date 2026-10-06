import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (config: ConfigService) => ({
				type: 'postgres',
				host: config.get<string>('DB_HOST'),
				port: Number(config.get<string>('DB_PORT') ?? 5432),
				username: config.get<string>('DB_USER'),
				password: config.get<string>('DB_PASSWORD'),
				database: config.get<string>('DB_NAME'),
				autoLoadEntities: true,
				synchronize: true,
			}),
		}),
		TasksModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
