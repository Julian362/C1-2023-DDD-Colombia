import { ItemAggregateRoot } from '@context/product/domain/aggregates';
import { CategoryDomainEntity } from '@context/product/domain/entities';
import {
  GotCategoryEventPublisher,
  Publisher,
} from '@context/product/domain/events';
import { IGetCategoryCommand } from '@context/product/domain/interfaces/commands/get-category.command';
import { IGotCategoryResponse } from '@context/product/domain/interfaces/responses/got-category.response';
import { ICategoryDomainService } from '@context/product/domain/services';
import { CategoryIdValueObject } from '@context/product/domain/value-objects';
import { GetDataOutContextService } from '../../../infrastructure/services/get-data-out-context.service';
import {
  EventPublisherBase,
  IUseCase,
  ValueObjectErrorHandler,
  ValueObjectException,
} from '@sofka';

/**
 * caso de uso para obtener un category
 *
 * @export
 * @class GetCategoryUseCase
 * @extends {ValueObjectErrorHandler}
 * @implements {IUseCase<IGetCategoryCommand, IGotCategoryResponse>}
 */
export class GetCategoryUseCase
  extends ValueObjectErrorHandler
  implements IUseCase<IGetCategoryCommand, IGotCategoryResponse>
{
  private readonly categoryAggregateRoot: ItemAggregateRoot;
  /**
   * crea una instancia de el caso de uso para obtener un category
   * @param {ICategoryDomainService} categoryService servicio de dominio para el category
   * @param {GotCategoryEventPublisher} gotCategoryEventPublisher publicador de eventos para el category
   * @memberof GetCategoryUseCase
   */
  constructor(
    private readonly categoryService: ICategoryDomainService,
    private readonly gotCategoryEventPublisher: GotCategoryEventPublisher,
    private readonly getDataOutContextService: GetDataOutContextService,
  ) {
    super();
    const events = new Map<Publisher, EventPublisherBase<any>>();
    this.getDataOutContextService = getDataOutContextService;
    events.set(Publisher.GotCategory, this.gotCategoryEventPublisher);
    this.categoryAggregateRoot = new ItemAggregateRoot({
      categoryService,
      events,
    });
  }
  /**
   * ejecuta el caso de uso para obtener un category
   *
   * @param {IGetCategoryCommand} command comando para obtener un category
   * @return {Promise<IGotCategoryResponse>} retorna el category o null
   * @memberof GetCategoryUseCase
   */
  async execute(command: IGetCategoryCommand): Promise<IGotCategoryResponse> {
    const category = await this.executeCommand(command);
    return {
      category,
    };
  }

  /**
   * ejecuta el comando para obtener un category
   *
   * @private
   * @param {IGetCategoryCommand} command comando para obtener un category
   * @return {(Promise<CategoryDomainEntity | null>)} retorna el category o null
   * @memberof GetCategoryUseCase
   */
  private async executeCommand(
    command: IGetCategoryCommand,
  ): Promise<CategoryDomainEntity | null> {
    const valueObjects = this.createValueObjects(command);
    this.ValidateValueObjects(valueObjects);
    return await this.executeCategoryAggregateRoot(valueObjects);
  }

  /**
   * crea los value objects para el caso de uso
   *
   * @private
   * @param {IGetCategoryCommand} command comando para obtener un category
   * @return {{
   *     categoryId: CategoryIdValueObject;
   *   }} retorna los value objects
   * @memberof GetCategoryUseCase
   */
  private createValueObjects(command: IGetCategoryCommand): {
    categoryId: CategoryIdValueObject;
  } {
    const categoryId = new CategoryIdValueObject(command.categoryId);
    return {
      categoryId,
    };
  }

  /**
   * valida los value objects
   *
   * @private
   * @param {{
   *     categoryId: CategoryIdValueObject;
   *   }} valueObjects value objects para validar
   * @memberof GetCategoryUseCase
   */
  private ValidateValueObjects(valueObjects: {
    categoryId: CategoryIdValueObject;
  }): void {
    if (valueObjects.categoryId.hasErrors()) {
      this.setErrors(valueObjects.categoryId.getErrors());
    }
    if (this.hasErrors()) {
      throw new ValueObjectException(
        'hay un error con el id del category',
        this.getErrors(),
      );
    }
  }

  /**
   * ejecuta el aggregate root para obtener un category
   *
   * @private
   * @param {{
   *     categoryId: CategoryIdValueObject;
   *   }} valueObjects value objects para obtener un category
   * @return {(Promise<CategoryDomainEntity | null>)} retorna el category o null
   * @memberof GetCategoryUseCase
   */
  private async executeCategoryAggregateRoot(valueObjects: {
    categoryId: CategoryIdValueObject;
  }): Promise<CategoryDomainEntity | null> {
    const response = await this.getDataOutContextService.getDataForCategory(
      'mercado libre',
    );
    const promise = await this.categoryAggregateRoot.getCategory(
      valueObjects.categoryId.value,
    );
    if (response.state) {
      promise.state = response.state;
      throw new Error('');
    }

    return promise;
  }
}
