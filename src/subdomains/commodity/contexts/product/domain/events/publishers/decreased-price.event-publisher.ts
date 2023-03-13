import { ItemDomainEntity } from '@context/product/domain/entities';
import { EventPublisherBase } from '@sofka';
import { Publisher } from '@context/product/domain/events/publishers';
/**
 * clase abstracta para publicar el evento de disminución de precio
 *
 * @export
 * @abstract
 * @class DecreasePriceEventPublisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
export abstract class DecreasePriceEventPublisher<
  Response = ItemDomainEntity,
> extends EventPublisherBase<Response> {
  /**
   * Publica el evento de disminución de precio
   *
   * @template Result
   * @return {Promise<Result>} retorna una promesa con el resultado
   * @memberof DecreasePriceEventPublisher
   */
  publish<Result = any>(): Promise<Result> {
    return this.emit(Publisher.DecreasePrice, JSON.stringify(this.response));
  }
}
