import { EventPublisherBase } from 'src/shared/sofka/interface/event-publisher.base';
import { ItemDomainEntity } from '../../entities/item.domain-entity';
import { Publisher } from './enums/publisher.enum';
/**
 * clase abstracta para publicar el evento de disminucion de precio
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
