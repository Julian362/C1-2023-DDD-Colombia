import { ItemDomainEntity } from '@context/product/domain/entities';
import { EventPublisherBase } from '@sofka';
import { Publisher } from '@context/product/domain/events/publishers';

/**
 * clase abstracta para publicar el evento de cambio de la descripción del item
 *
 * @export
 * @abstract
 * @class ChangedDescriptionEventPublisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
export abstract class ChangedDescriptionEventPublisher<
  Response = ItemDomainEntity,
> extends EventPublisherBase<Response> {
  /**
   * publica el evento de cambio de la descripción del item
   *
   * @template Result
   * @return {Promise<Result>} retorna una promesa con el resultado
   * @memberof ChangedDescriptionEventPublisher
   */
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      Publisher.ChangedDescription,
      JSON.stringify(this.response),
    );
  }
}
