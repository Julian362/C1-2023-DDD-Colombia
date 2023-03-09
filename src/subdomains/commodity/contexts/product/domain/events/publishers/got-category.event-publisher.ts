import { EventPublisherBase } from 'src/shared/sofka/interface/event-publisher.base';
import { CategoryDomainEntity } from '../../entities/category.domain-entity';
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
    return this.emit(
      'producto.categoría-obtenida',
      JSON.stringify(this.response),
    );
  }
}
