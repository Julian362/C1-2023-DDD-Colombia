import { IGetCategoryCommand } from '@context/product/domain/interfaces/commands/get-category.command';

export class GetCategoryCommand implements IGetCategoryCommand {
  categoryId: string;
}
