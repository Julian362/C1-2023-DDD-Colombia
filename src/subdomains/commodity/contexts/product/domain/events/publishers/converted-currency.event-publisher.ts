import { ItemDomainEntity } from '@context/product/domain/entities';
import { EventPublisherBase } from '@sofka';
import { Publisher } from '@context/product/domain/events/publishers';
/**
 * clase abstracta para publicar el evento de moneda de precio convertida
 *
 * @export
 * @abstract
 * @class ConvertedCurrencyEventPublisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
export abstract class ConvertedCurrencyEventPublisher<
  Response = ItemDomainEntity,
> extends EventPublisherBase<Response> {
  /**
   * Publica el evento de moneda de precio convertida
   *
   * @template Result
   * @return {Promise<Result>} retorna una promesa con el resultado
   * @memberof ConvertedCurrencyEventPublisher
   */
  publish<Result = any>(): Promise<Result> {
    return this.emit(Publisher.ConvertCurrency, JSON.stringify(this.response));
  }
}
