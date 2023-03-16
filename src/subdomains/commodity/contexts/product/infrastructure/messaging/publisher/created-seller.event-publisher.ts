import { SellerDomainEntity } from '@context/product/domain/entities';
import { Publisher } from '@context/product/domain/events';
import { EventPublisherBase } from '@sofka';
/**
 * clase abstracta para publicar el evento de seller creado
 *
 * @export
 * @abstract
 * @class CreatedSellerEventPublisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
/**
 *
 *
 * @export
 * @abstract
 * @class CreatedSellerEventPublisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
export abstract class CreatedSellerEventPublisher<
  Response = SellerDomainEntity,
> extends EventPublisherBase<Response> {
  /**
   * Publica el evento de seller creado
   *
   * @template Result
   * @return {Promise<Result>} retorna una promesa con el resultado
   * @memberof CreatedSellerEventPublisher
   */
  publish<Result = any>(): Promise<Result> {
    return this.emit(Publisher.CreatedSeller, JSON.stringify(this.response));
  }
}
