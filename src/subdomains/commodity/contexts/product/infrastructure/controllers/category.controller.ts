import { IGotCategoryResponse } from '@context/product/domain/interfaces/responses/got-category.response';
import { Controller, Get, Body, UseGuards } from '@nestjs/common';
import { GetCategoryUseCase } from '../../application/use-cases/get-category';
import { GotCategoryPublisher } from '../messaging/publisher/got-category.event-publisher';
import { CategoryService } from '../persistence/services/category.service';
import { GetDataOutContextService } from '../services/get-data-out-context.service';
import { GetCategoryCommand } from '../utils/commands/get-category.command';
import { AuthGuard } from '../utils/guards/auth/auth.guard';

@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly gotCategoryPublisher: GotCategoryPublisher,
    private readonly getDataOutContextService: GetDataOutContextService,
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  async getCategory(
    @Body() command: GetCategoryCommand,
  ): Promise<IGotCategoryResponse> {
    const useCase = new GetCategoryUseCase(
      this.categoryService,
      this.gotCategoryPublisher,
      this.getDataOutContextService,
    );

    return await useCase.execute(command);
  }
}
