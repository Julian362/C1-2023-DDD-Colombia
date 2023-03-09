import { EventPublisherBase } from 'src/shared/sofka/interface/event-publisher.base';
import { SellerDomainEntity } from '../../entities/seller.domain-entity';
/**
 * clase abstracta para publicar el evento de cambio de estado de un vendedor
 *
 * @export
 * @abstract
 * @class ChangedStateSellerEventPublisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
export abstract class ChangedStateSellerEventPublisher<
  Response = SellerDomainEntity,
> extends EventPublisherBase<Response> {
  /**
   * publica el evento de cambio de estado de un vendedor
   *
   * @template Result
   * @return {Promise<Result>} retorna una promesa con el resultado
   * @memberof ChangedStateSellerEventPublisher
   */
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'producto.estado-vendedor-modificado',
      JSON.stringify(this.response),
    );
  }
}
