import { SellerDomainEntity } from '@context/product/domain/entities';
import { Publisher } from '@context/product/domain/events';
import { EventPublisherBase } from '@sofka';
/**
 * clase abstracta para publicar el evento de vendedor obtenido
 *
 * @export
 * @abstract
 * @class GotSellerEventPublisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
export abstract class GotSellerEventPublisher<
  Response = SellerDomainEntity,
> extends EventPublisherBase<Response> {
  /**
   * Publica el evento de vendedor obtenido
   *
   * @template Result
   * @return {Promise<Result>} retorna una promesa con el resultado
   * @memberof GotSellerEventPublisher
   */
  publish<Result = any>(): Promise<Result> {
    return this.emit(Publisher.GotSeller, JSON.stringify(this.response));
  }
}
