import { EventPublisherBase } from 'src/shared/sofka/interface/event-publisher.base';
import { CategoryDomainEntity } from '../../entities/category.domain-entity';

/**
 * clase abstracta para publicar el evento de cambio de nombre de categoría
 *
 * @export
 * @abstract
 * @class ChangedNameCategoryEventPublisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
export abstract class ChangedNameCategoryEventPublisher<
  Response = CategoryDomainEntity,
> extends EventPublisherBase<Response> {
  /**
   * publica el evento de cambio de nombre de categoría
   *
   * @template Result
   * @return {Promise<Result>} retorna una promesa con el resultado
   * @memberof ChangedNameCategoryEventPublisher
   */
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'producto.nombre-categoría-modificado',
      JSON.stringify(this.response),
    );
  }
}
