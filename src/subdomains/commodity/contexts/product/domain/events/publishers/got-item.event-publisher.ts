import { EventPublisherBase } from 'src/shared/sofka/interface/event-publisher.base';
import { ItemDomainEntity } from '../../entities/item.domain-entity';
import { Publisher } from './enums/publisher.enum';
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
