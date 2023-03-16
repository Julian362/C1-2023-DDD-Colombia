import { ItemAggregateRoot } from '@context/product/domain/aggregates';
import { ItemDomainEntity } from '@context/product/domain/entities';
import {
  GotItemEventPublisher,
  Publisher,
} from '@context/product/domain/events';
import {
  IGetItemCommand,
  IGotITemResponse,
} from '@context/product/domain/interfaces';
import { IItemDomainService } from '@context/product/domain/services';
import { ItemIdValueObject } from '@context/product/domain/value-objects';
import {
  EventPublisherBase,
  IUseCase,
  ValueObjectErrorHandler,
  ValueObjectException,
} from '@sofka';

/**
 * caso de uso para obtener un item
 *
 * @export
 * @class GetItemUseCase
 * @extends {ValueObjectErrorHandler}
 * @implements {IUseCase<IGetItemCommand, IGotITemResponse>}
 */
export class GetItemUseCase
  extends ValueObjectErrorHandler
  implements IUseCase<IGetItemCommand, IGotITemResponse>
{
  private readonly itemAggregateRoot: ItemAggregateRoot;
  /**
   * crea una instancia de el caso de uso para obtener un item
   * @param {IItemDomainService} itemService servicio de dominio para el item
   * @param {GotItemEventPublisher} gotItemEventPublisher publicador de eventos para el item
   * @memberof GetItemUseCase
   */
  constructor(
    private readonly itemService: IItemDomainService,
    private readonly gotItemEventPublisher: GotItemEventPublisher,
  ) {
    super();
    const events = new Map<Publisher, EventPublisherBase<any>>();
    events.set(Publisher.GotItem, this.gotItemEventPublisher);
    this.itemAggregateRoot = new ItemAggregateRoot({
      itemService,
      events,
    });
  }
  /**
   * ejecuta el caso de uso para obtener un item
   *
   * @param {IGetItemCommand} command comando para obtener un item
   * @return {Promise<IGotITemResponse>} retorna el item o null
   * @memberof GetItemUseCase
   */
  async execute(command: IGetItemCommand): Promise<IGotITemResponse> {
    const item = await this.executeCommand(command);
    return {
      item,
    };
  }

  /**
   * ejecuta el comando para obtener un item
   *
   * @private
   * @param {IGetItemCommand} command comando para obtener un item
   * @return {(Promise<ItemDomainEntity | null>)} retorna el item o null
   * @memberof GetItemUseCase
   */
  private async executeCommand(
    command: IGetItemCommand,
  ): Promise<ItemDomainEntity | null> {
    const valueObjects = this.createValueObjects(command);
    this.ValidateValueObjects(valueObjects);
    return await this.executeItemAggregateRoot(valueObjects);
  }

  /**
   * crea los value objects para el caso de uso
   *
   * @private
   * @param {IGetItemCommand} command comando para obtener un item
   * @return {{
   *     itemId: ItemIdValueObject;
   *   }} retorna los value objects
   * @memberof GetItemUseCase
   */
  private createValueObjects(command: IGetItemCommand): {
    itemId: ItemIdValueObject;
  } {
    const itemId = new ItemIdValueObject(command.id);
    return {
      itemId,
    };
  }

  /**
   * valida los value objects
   *
   * @private
   * @param {{
   *     itemId: ItemIdValueObject;
   *   }} valueObjects value objects para validar
   * @memberof GetItemUseCase
   */
  private ValidateValueObjects(valueObjects: {
    itemId: ItemIdValueObject;
  }): void {
    if (valueObjects.itemId.hasErrors()) {
      this.setErrors(valueObjects.itemId.getErrors());
    }
    if (this.hasErrors()) {
      throw new ValueObjectException(
        'hay un error con el id del item',
        this.getErrors(),
      );
    }
  }

  /**
   * ejecuta el aggregate root para obtener un item
   *
   * @private
   * @param {{
   *     itemId: ItemIdValueObject;
   *   }} valueObjects value objects para obtener un item
   * @return {(Promise<ItemDomainEntity | null>)} retorna el item o null
   * @memberof GetItemUseCase
   */
  private async executeItemAggregateRoot(valueObjects: {
    itemId: ItemIdValueObject;
  }): Promise<ItemDomainEntity | null> {
    return await this.itemAggregateRoot.getItem(valueObjects.itemId.value);
  }
}
