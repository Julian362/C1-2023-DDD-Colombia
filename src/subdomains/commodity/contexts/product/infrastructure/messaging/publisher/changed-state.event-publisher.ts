import { ItemDomainEntity } from '@context/product/domain/entities';
import { EventPublisherBase } from '@sofka';
import { Publisher } from '@context/product/domain/events/publishers';
/**
 * clase abstracta para publicar eventos de cambio de estado
 *
 * @export
 * @abstract
 * @class ChangedStateEventPublisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
export abstract class ChangedStateEventPublisher<
  Response = ItemDomainEntity,
> extends EventPublisherBase<Response> {
  /**
   * publica el evento de cambio de estado
   *
   * @template Result
   * @return {Promise<Result>} retorna una promesa con el resultado
   * @memberof ChangedStateEventPublisher
   */
  publish<Result = any>(): Promise<Result> {
    return this.emit(Publisher.ChangedState, JSON.stringify(this.response));
  }
}
