import { EventPublisherBase } from '@sofka';
import { ItemDomainEntity } from '@context/product/domain/entities';
import { Publisher } from '@context/product/domain/events/publishers';

/**
 * clase abstracta para publicar el evento de producto obtenido
 *
 * @export
 * @abstract
 * @class GotItemEventPublisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
export abstract class GotItemEventPublisher<
  Response = ItemDomainEntity,
> extends EventPublisherBase<Response> {
  /**
   * Publica el evento de producto obtenido
   *
   * @template Result
   * @return {Promise<Result>} retorna una promesa con el resultado
   * @memberof GotItemEventPublisher
   */
  publish<Result = any>(): Promise<Result> {
    return this.emit(Publisher.GotItem, JSON.stringify(this.response));
  }
}
