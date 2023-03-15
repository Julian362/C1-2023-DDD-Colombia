import { EventPublisherBase } from '@sofka';
import { ItemDomainEntity } from '@context/product/domain/entities';
import { Publisher } from '@context/product/domain/events/publishers';

/**
 *  clase abstracta para publicar el evento de aumento de precio
 *
 * @export
 * @abstract
 * @class IncreasePriceEventPublisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
export abstract class IncreasePriceEventPublisher<
  Response = ItemDomainEntity,
> extends EventPublisherBase<Response> {
  /**
   * publica el evento de aumento de precio
   *
   * @template Result
   * @return {Promise<Result>} retorna una promesa con el resultado
   * @memberof IncreasePriceEventPublisher
   */
  publish<Result = any>(): Promise<Result> {
    return this.emit(Publisher.IncreasePrice, JSON.stringify(this.response));
  }
}
