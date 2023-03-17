import { IGetCategoryCommand } from '@context/product/domain/interfaces/commands/get-category.command';
import { ApiProperty } from '@nestjs/swagger';

export class GetCategoryCommand implements IGetCategoryCommand {
  @ApiProperty()
  categoryId: string;
}
