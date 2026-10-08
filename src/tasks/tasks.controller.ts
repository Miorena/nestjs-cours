import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { QueryTaskDto } from './dto/query-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
	constructor(private readonly taskService: TasksService) { }

	@Get()
	findAll(@Query() query: QueryTaskDto) {
		return this.taskService.findAll(query);
	}

	@Get('stats')
	getStat() {
		return this.taskService.getStats();
	}

	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.taskService.findOne(id);
	}

	@Post()
	create(@Body() dto: CreateTaskDto) {
		return this.taskService.create(dto);
	}

	@Patch(':id/done')
	markDone(@Param('id', ParseIntPipe) id: number) {
		return this.taskService.markDone(id);
	}

	@Delete(':id')
	@HttpCode(204)
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.taskService.remove(id);
	}
}
