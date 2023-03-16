import { ItemAggregateRoot } from '@context/product/domain/aggregates';
import { SellerDomainEntity } from '@context/product/domain/entities';
import {
  GotSellerEventPublisher,
  Publisher,
} from '@context/product/domain/events';
import { IGetSellerCommand } from '@context/product/domain/interfaces/commands/get-seller.command';
import { IGotSellerResponse } from '@context/product/domain/interfaces/responses/got-seller.response';
import { ISellerDomainService } from '@context/product/domain/services';
import { SellerIdValueObject } from '@context/product/domain/value-objects';
import {
  EventPublisherBase,
  IUseCase,
  ValueObjectErrorHandler,
  ValueObjectException,
} from '@sofka';

/**
 * caso de uso para obtener un seller
 *
 * @export
 * @class GetSellerUseCase
 * @extends {ValueObjectErrorHandler}
 * @implements {IUseCase<IGetSellerCommand, IGotSellerResponse>}
 */
export class GetSellerUseCase
  extends ValueObjectErrorHandler
  implements IUseCase<IGetSellerCommand, IGotSellerResponse>
{
  private readonly ItemAggregateRoot: ItemAggregateRoot;
  /**
   * crea una instancia de el caso de uso para obtener un seller
   * @param {ISellerDomainService} sellerService servicio de dominio para el seller
   * @param {GotSellerEventPublisher} gotSellerEventPublisher publicador de eventos para el seller
   * @memberof GetSellerUseCase
   */
  constructor(
    private readonly sellerService: ISellerDomainService,
    private readonly gotSellerEventPublisher: GotSellerEventPublisher,
  ) {
    super();
    const events = new Map<Publisher, EventPublisherBase<any>>();
    events.set(Publisher.GotSeller, this.gotSellerEventPublisher);
    this.ItemAggregateRoot = new ItemAggregateRoot({
      sellerService,
      events,
    });
  }
  /**
   * ejecuta el caso de uso para obtener un seller
   *
   * @param {IGetSellerCommand} command comando para obtener un seller
   * @return {Promise<IGotSellerResponse>} retorna el seller o null
   * @memberof GetSellerUseCase
   */
  async execute(command: IGetSellerCommand): Promise<IGotSellerResponse> {
    const seller = await this.executeCommand(command);
    return {
      seller,
    };
  }

  /**
   * ejecuta el comando para obtener un seller
   *
   * @private
   * @param {IGetSellerCommand} command comando para obtener un seller
   * @return {(Promise<SellerDomainEntity | null>)} retorna el seller o null
   * @memberof GetSellerUseCase
   */
  private async executeCommand(
    command: IGetSellerCommand,
  ): Promise<SellerDomainEntity | null> {
    const valueObjects = this.createValueObjects(command);
    this.ValidateValueObjects(valueObjects);
    return await this.executeItemAggregateRoot(valueObjects);
  }

  /**
   * crea los value objects para el caso de uso
   *
   * @private
   * @param {IGetSellerCommand} command comando para obtener un seller
   * @return {{
   *     sellerId: SellerIdValueObject;
   *   }} retorna los value objects
   * @memberof GetSellerUseCase
   */
  private createValueObjects(command: IGetSellerCommand): {
    sellerId: SellerIdValueObject;
  } {
    const sellerId = new SellerIdValueObject(command.sellerId);
    return {
      sellerId,
    };
  }

  /**
   * valida los value objects
   *
   * @private
   * @param {{
   *     sellerId: SellerIdValueObject;
   *   }} valueObjects value objects para validar
   * @memberof GetSellerUseCase
   */
  private ValidateValueObjects(valueObjects: {
    sellerId: SellerIdValueObject;
  }): void {
    if (valueObjects.sellerId.hasErrors()) {
      this.setErrors(valueObjects.sellerId.getErrors());
    }
    if (this.hasErrors()) {
      throw new ValueObjectException(
        'hay un error con el id del seller',
        this.getErrors(),
      );
    }
  }

  /**
   * ejecuta el aggregate root para obtener un seller
   *
   * @private
   * @param {{
   *     sellerId: SellerIdValueObject;
   *   }} valueObjects value objects para obtener un seller
   * @return {(Promise<SellerDomainEntity | null>)} retorna el seller o null
   * @memberof GetSellerUseCase
   */
  private async executeItemAggregateRoot(valueObjects: {
    sellerId: SellerIdValueObject;
  }): Promise<SellerDomainEntity | null> {
    return await this.ItemAggregateRoot.getSeller(valueObjects.sellerId.value);
  }
}
