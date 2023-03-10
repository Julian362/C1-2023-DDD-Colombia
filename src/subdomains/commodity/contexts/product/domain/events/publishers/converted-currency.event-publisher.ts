import { EventPublisherBase } from 'src/shared/sofka/interface/event-publisher.base';
import { ItemDomainEntity } from '../../entities/item.domain-entity';
import { Publisher } from './enums/publisher.enum';
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
