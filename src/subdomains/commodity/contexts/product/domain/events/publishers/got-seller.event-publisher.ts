import { EventPublisherBase } from 'src/shared/sofka/interface/event-publisher.base';
import { SellerDomainEntity } from '../../entities/seller.domain-entity';
/**
 * clase abstracta para publicar el evento de vendedor obtenido
 *
 * @export
 * @abstract
 * @class GotSellerEventPublisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
export abstract class GotSellerEventPublisher<
  Response = SellerDomainEntity,
> extends EventPublisherBase<Response> {
  /**
   * Publica el evento de vendedor obtenido
   *
   * @template Result
   * @return {Promise<Result>} retorna una promesa con el resultado
   * @memberof GotSellerEventPublisher
   */
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'producto.vendedor-obtenido',
      JSON.stringify(this.response),
    );
  }
}
