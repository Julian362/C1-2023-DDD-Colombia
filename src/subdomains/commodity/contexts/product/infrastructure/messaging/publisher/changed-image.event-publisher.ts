import { EventPublisherBase } from '@sofka';
import { ItemDomainEntity } from '@context/product/domain/entities';
import { Publisher } from '@context/product/domain/events/publishers';

/**
 * clase abstracta para publicar el evento de cambio de la url de la imagen
 *
 * @export
 * @abstract
 * @class ChangedImageEventPublisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
export abstract class ChangedImageEventPublisher<
  Response = ItemDomainEntity,
> extends EventPublisherBase<Response> {
  /**
   * publica el evento de cambio de la url de la imagen
   *
   * @template Result
   * @return {Promise<Result>} retorna una promesa con el resultado
   * @memberof ChangedImageEventPublisher
   */
  publish<Result = any>(): Promise<Result> {
    return this.emit(Publisher.ChangedName, JSON.stringify(this.response));
  }
}
