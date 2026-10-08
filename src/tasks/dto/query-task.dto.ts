import { Transform } from "class-transformer";
import { IsBoolean, IsIn, IsOptional, IsString } from "class-validator";
import { PaginationQueryDto } from "../../common/dto/pagination-query.dto";

export class QueryTaskDto extends PaginationQueryDto {
	@IsOptional()
	@Transform(({ value }) => value === 'true' ? true : value === 'false' ? false : value,)
	@IsBoolean()
	done?: boolean;

	@IsOptional()
	@IsString()
	search?: string;

	@IsOptional()
	@IsIn(['id', 'title', 'done'])
	sortBy?: 'id' | 'title' | 'done' = 'id';

	@IsOptional()
	@IsIn(['ASC', 'DESC'])
	order?: 'ASC' | 'DESC' = 'ASC';
}