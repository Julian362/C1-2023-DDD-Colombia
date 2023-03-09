import { EventPublisherBase } from 'src/shared/sofka/interface/event-publisher.base';
import { ItemDomainEntity } from '../../entities/item.domain-entity';

/**
 *  clase abstracta para publicar el evento de aumento de precio
 *
 * @export
 * @abstract
 * @class IncreasePriceEventPublisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
export abstract class IncreasePriceEventPublisher<
  Response = ItemDomainEntity,
> extends EventPublisherBase<Response> {
  /**
   * publica el evento de aumento de precio
   *
   * @template Result
   * @return {Promise<Result>} retorna una promesa con el resultado
   * @memberof IncreasePriceEventPublisher
   */
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'producto.precio-aumentado',
      JSON.stringify(this.response),
    );
  }
}
