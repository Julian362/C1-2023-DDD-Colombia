import { EventPublisherBase } from 'src/shared/sofka/interface/event-publisher.base';
import { ItemDomainEntity } from '../../entities/item.domain-entity';
import { Publisher } from './enums/publisher.enum';

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
