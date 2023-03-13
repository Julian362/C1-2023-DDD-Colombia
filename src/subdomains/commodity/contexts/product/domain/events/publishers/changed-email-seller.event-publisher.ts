import { SellerDomainEntity } from '@context/product/domain/entities';
import { EventPublisherBase } from '@sofka';
import { Publisher } from '@context/product/domain/events/publishers';

/**
 * clase abstracta para publicar el evento de cambio de email del vendedor
 *
 * @export
 * @abstract
 * @class ChangedEmailSellerEventPublisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
export abstract class ChangedEmailSellerEventPublisher<
  Response = SellerDomainEntity,
> extends EventPublisherBase<Response> {
  /**
   *  publica el evento de cambio de email del vendedor
   *
   * @template Result
   * @return {Promise<Result>} retorna una promesa con el resultado
   * @memberof ChangedEmailSellerEventPublisher
   */
  publish<Result = any>(): Promise<Result> {
    return this.emit(Publisher.ChangedEmail, JSON.stringify(this.response));
  }
}
