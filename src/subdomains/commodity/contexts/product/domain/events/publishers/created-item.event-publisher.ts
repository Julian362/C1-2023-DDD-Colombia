import { EventPublisherBase } from 'src/shared/sofka/interface/event-publisher.base';
import { ItemDomainEntity } from '../../entities/item.domain-entity';
/**
 * clase abstracta para publicar el evento de item creado
 *
 * @export
 * @abstract
 * @class CreatedItemEventPublisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
/**
 *
 *
 * @export
 * @abstract
 * @class CreatedItemEventPublisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
export abstract class CreatedItemEventPublisher<
  Response = ItemDomainEntity,
> extends EventPublisherBase<Response> {
  /**
   * Publica el evento de item creado
   *
   * @template Result
   * @return {Promise<Result>} retorna una promesa con el resultado
   * @memberof CreatedItemEventPublisher
   */
  publish<Result = any>(): Promise<Result> {
    return this.emit('producto.item-creado', JSON.stringify(this.response));
  }
}
