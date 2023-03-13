import { EventPublisherBase } from '@sofka';
import { SellerDomainEntity } from '@context/product/domain/entities';
import { Publisher } from '@context/product/domain/events/publishers';

/**
 * clase abstracta para publicar el evento de cambio de estado de un vendedor
 *
 * @export
 * @abstract
 * @class ChangedStateSellerEventPublisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
export abstract class ChangedStateSellerEventPublisher<
  Response = SellerDomainEntity,
> extends EventPublisherBase<Response> {
  /**
   * publica el evento de cambio de estado de un vendedor
   *
   * @template Result
   * @return {Promise<Result>} retorna una promesa con el resultado
   * @memberof ChangedStateSellerEventPublisher
   */
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      Publisher.ChangedStateSeller,
      JSON.stringify(this.response),
    );
  }
}
