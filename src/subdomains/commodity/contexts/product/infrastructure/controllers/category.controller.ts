import { IGotCategoryResponse } from '@context/product/domain/interfaces/responses/got-category.response';
import { Controller, Get, Body, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist';
import { GetCategoryUseCase } from '../../application/use-cases/get-category';
import { GotCategoryPublisher } from '../messaging/publisher/got-category.event-publisher';
import { CategoryService } from '../persistence/services/category.service';
import { GetDataOutContextService } from '../services/get-data-out-context.service';
import { GetCategoryCommand } from '../utils/commands/get-category.command';
import { AuthGuard } from '../utils/guards/auth/auth.guard';

/**
 * controlador para manejar las categorias
 *
 * @export
 * @class CategoryController
 */
@Controller('category')
@ApiTags('category')
export class CategoryController {
  /**
   * crea una instancia de CategoryController
   * @param {CategoryService} categoryService servicio de persistencia de categorias
   * @param {GotCategoryPublisher} gotCategoryPublisher publicador de eventos de categoria obtenida
   * @param {GetDataOutContextService} getDataOutContextService servicio de contexto de salida de datos
   * @memberof CategoryController
   */
  constructor(
    private readonly categoryService: CategoryService,
    private readonly gotCategoryPublisher: GotCategoryPublisher,
    private readonly getDataOutContextService: GetDataOutContextService,
  ) {}

  /**
   * obtiene una categoria por su nombre
   *
   * @param {GetCategoryCommand} command comando para obtener una categoría
   * @return  {Promise<IGotCategoryResponse>} respuesta de la obtencion de la categoría
   * @memberof CategoryController
   */
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
