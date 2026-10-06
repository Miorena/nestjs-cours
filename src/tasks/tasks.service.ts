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
		if (!task) {
			throw new NotFoundException(`Tâche ${id} introuvable`);
		}
		return task;
	}

	create(dto: CreateTaskDto): Promise<Task> {
		const task = this.taskRepository.create({ title: dto.title });
		return this.taskRepository.save(task);
	}

	async update(id: number, dto: UpdateTaskDto): Promise<Task> {
		const task = await this.findOne(id);
		if (dto.title !== undefined) task.title === dto.title;
		if (dto.done !== undefined) task.done === dto.done;
		return this.taskRepository.save(task);
	}

	async markDone(id: number): Promise<Task> {
		const task = await this.findOne(id);
		task.done = true;
		return this.taskRepository.save(task);
	}

	async remove(id: number): Promise<void> {
		const task = await this.findOne(id);
		await this.taskRepository.remove(task);
	}
}
