import { EventPublisherBase } from 'src/shared/sofka/interface/event-publisher.base';
import { SellerDomainEntity } from '../../entities/seller.domain-entity';

/**
 * clase abstracta para publicar el evento de cambio de email del vendedor
 *
 * @export
 * @abstract
 * @class ChangedEmailSellerEventPublisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
export abstract class ChangedEmailSellerEventPublisher<
  Response = SellerDomainEntity,
> extends EventPublisherBase<Response> {
  /**
   *  publica el evento de cambio de email del vendedor
   *
   * @template Result
   * @return {Promise<Result>} retorna una promesa con el resultado
   * @memberof ChangedEmailSellerEventPublisher
   */
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'producto.email-vendedor-modificado',
      JSON.stringify(this.response),
    );
  }
}
