import { EventPublisherBase } from '@sofka';
import { SellerDomainEntity } from '../../entities/seller.domain-entity';
import { Publisher } from './enums/publisher.enum';
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
