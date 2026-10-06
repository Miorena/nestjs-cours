import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tasks')
export class Task {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 100 })
	title: string;

	@Column({ default: false })
	done: boolean;
}
