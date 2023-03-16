import { SellerDomainEntity } from '@context/product/domain/entities';
import { Publisher } from '@context/product/domain/events';
import { EventPublisherBase } from '@sofka';
/**
 * clase abstracta para publicar el evento de cambio de nombre del vendedor
 *
 * @export
 * @abstract
 * @class ChangedNameSellerEventPublisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
export abstract class ChangedNameSellerEventPublisher<
  Response = SellerDomainEntity,
> extends EventPublisherBase<Response> {
  /**
   * publica el evento de cambio de nombre del vendedor
   *
   * @template Result
   * @return {Promise<Result>} retorna una promesa con el resultado
   * @memberof ChangedNameSellerEventPublisher
   */
  publish<Result = any>(): Promise<Result> {
    return this.emit(Publisher.ChangeNameSeller, JSON.stringify(this.response));
  }
}
