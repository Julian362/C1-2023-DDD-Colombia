import { ItemDomainEntity } from '@context/product/domain/entities';
import { EventPublisherBase } from '@sofka';
import { Publisher } from '@context/product/domain/events/publishers';

/**
 * clase abstracta para publicar el evento de nombre de producto modificado
 *
 * @export
 * @abstract
 * @class ChangedNameEventPublisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
export abstract class ChangedNameEventPublisher<
  Response = ItemDomainEntity,
> extends EventPublisherBase<Response> {
  /**
   * Publica el evento de nombre de producto modificado
   *
   * @template Result
   * @return {Promise<Result>} retorna una promesa con el resultado
   * @memberof ChangedNameEventPublisher
   */
  publish<Result = any>(): Promise<Result> {
    return this.emit(Publisher.ChangedName, JSON.stringify(this.response));
  }
}
