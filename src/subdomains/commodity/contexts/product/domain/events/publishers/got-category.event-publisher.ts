import { EventPublisherBase } from '@sofka';
import { Publisher } from '@context/product/domain/events/publishers';
import { CategoryDomainEntity } from '@context/product/domain/entities';
/**
 * clase abstracta para publicar el evento de categoría obtenida
 *
 * @export
 * @abstract
 * @class GotCategoryEventPublisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
export abstract class GotCategoryEventPublisher<
  Response = CategoryDomainEntity,
> extends EventPublisherBase<Response> {
  /**
   * Publica el evento de categoría obtenida
   *
   * @template Result
   * @return {Promise<Result>} retorna una promesa con el resultado
   * @memberof GotCategoryEventPublisher
   */
  publish<Result = any>(): Promise<Result> {
    return this.emit(Publisher.GotCategory, JSON.stringify(this.response));
  }
}
