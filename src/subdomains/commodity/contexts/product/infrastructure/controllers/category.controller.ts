import { IGotCategoryResponse } from '@context/product/domain/interfaces/responses/got-category.response';
import { Controller, Get, Body } from '@nestjs/common';
import { GetCategoryUseCase } from '../../application/use-cases/get-category';
import { GotCategoryPublisher } from '../messaging/publisher/got-category.event-publisher';
import { CategoryService } from '../persistence/services/category.service';
import { GetCategoryCommand } from '../utils/commands/get-category.command';

@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly gotCategoryPublisher: GotCategoryPublisher,
  ) {}

  @Get()
  async getCategory(
    @Body() command: GetCategoryCommand,
  ): Promise<IGotCategoryResponse> {
    const useCase = new GetCategoryUseCase(
      this.categoryService,
      this.gotCategoryPublisher,
    );

    return await useCase.execute(command);
  }
}
