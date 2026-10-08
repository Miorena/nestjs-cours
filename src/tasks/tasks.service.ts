import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { QueryTaskDto } from './dto/query-task.dto';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
	constructor(
		@InjectRepository(Task)
		private readonly taskRepository: Repository<Task>,
	) { }

	async findAll(query: QueryTaskDto) {
		const { page = 1, limit = 10, done, search, sortBy = 'id', order = 'ASC' } = query;

		const where: FindOptionsWhere<Task> = {};
		if (done !== undefined) where.done = done;
		if (search) where.title = ILike(`%${search}%`);

		const [items, total] = await this.taskRepository.findAndCount({
			where,
			order: { [sortBy]: order },
			skip: (page - 1) * limit,
			take: limit,
		});

		return {
			items,
			meta: {
				total,
				page,
				limit,
				totalPages: Math.ceil(total / limit),
			},
		};
	}

	async getStats() {
		const [total, done] = await Promise.all([
			this.taskRepository.count(),
			this.taskRepository.count({ where: { done: true } }),
		]);
		return { total, done, pending: total - done };
	}

	async findOne(id: number): Promise<Task> {
		const task = await this.taskRepository.findOneBy({ id });
		if (!task) throw new NotFoundException(`Tâche ${id} introuvable`);
		return task;
	}

	create(dto: CreateTaskDto): Promise<Task> {
		return this.taskRepository.save(this.taskRepository.create({ title: dto.title }));
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
