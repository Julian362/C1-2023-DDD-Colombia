import { IUseCase, ValueObjectException } from 'src/shared/sofka';
import { ValueObjectErrorHandler } from '../../../../../../../shared/sofka/bases/value-object-error-handler.base';
import { IGetItemUserCommand } from '../../../domain/interfaces/commands/get-item.command';
import { IGotITemResponse } from '../../../domain/interfaces/responses/got-item.response';
import { IItemDomainService } from '../../../domain/services/item.domain-service';
import { ItemAggregateRoot } from '../../../domain/aggregates/Item/Item.aggregate';
import { GotItemEventPublisher } from '../../../domain/events/publishers/got-item.event-publisher';
import { ItemDomainEntity, ItemIdValueObject } from '@context/product/domain';
/**
 * caso de uso para obtener un item
 *
 * @export
 * @class GetItemUseCase
 * @extends {ValueObjectErrorHandler}
 * @implements {IUseCase<IGetItemUserCommand, IGotITemResponse>}
 */
export class GetItemUseCase
  extends ValueObjectErrorHandler
  implements IUseCase<IGetItemUserCommand, IGotITemResponse>
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
    this.itemAggregateRoot = new ItemAggregateRoot({
      itemService,
      gotItemEP: gotItemEventPublisher,
    });
  }
  /**
   * ejecuta el caso de uso para obtener un item
   *
   * @param {IGetItemUserCommand} command comando para obtener un item
   * @return {Promise<IGotITemResponse>} retorna el item o null
   * @memberof GetItemUseCase
   */
  async execute(command: IGetItemUserCommand): Promise<IGotITemResponse> {
    const item = await this.executeCommand(command);
    return {
      item,
    };
  }

  /**
   * ejecuta el comando para obtener un item
   *
   * @private
   * @param {IGetItemUserCommand} command comando para obtener un item
   * @return {(Promise<ItemDomainEntity | null>)} retorna el item o null
   * @memberof GetItemUseCase
   */
  private async executeCommand(
    command: IGetItemUserCommand,
  ): Promise<ItemDomainEntity | null> {
    const valueObjects = this.createValueObjects(command);
    this.ValidateValueObjects(valueObjects);
    return await this.executeItemAggregateRoot(valueObjects);
  }

  /**
   * crea los value objects para el caso de uso
   *
   * @private
   * @param {IGetItemUserCommand} command comando para obtener un item
   * @return {{
   *     itemId: ItemIdValueObject;
   *   }} retorna los value objects
   * @memberof GetItemUseCase
   */
  private createValueObjects(command: IGetItemUserCommand): {
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
