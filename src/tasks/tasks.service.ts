import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
	constructor(
		@InjectRepository(Task)
		private readonly taskRepository: Repository<Task>,
	) { }

	findAll(): Promise<Task[]> {
		return this.taskRepository.find({ order: { id: 'ASC' } });
	}

	async findOne(id: number): Promise<Task> {
		const task = await this.taskRepository.findOneBy({ id });
		if (!task) throw new NotFoundException(`Tâche ${id} introuvable`);
		return task;
	}

	create(dto: CreateTaskDto): Promise<Task> {
		return this.taskRepository.save(this.taskRepository.create(dto));
	}

	async update(id: number, dto: UpdateTaskDto): Promise<Task> {
		const task = await this.findOne(id);
		Object.assign(task, dto);
		return this.taskRepository.save(task);
	}

	async markDone(id: number): Promise<Task> {
		const task = await this.findOne(id);
		task.done = true;
		return this.taskRepository.save(task);
	}

	async remove(id: number): Promise<Task> {
		const task = await this.findOne(id);
		return this.taskRepository.remove(task);
	}
}
