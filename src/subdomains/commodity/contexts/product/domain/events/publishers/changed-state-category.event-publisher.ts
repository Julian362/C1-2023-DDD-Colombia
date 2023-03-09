import { EventPublisherBase } from 'src/shared/sofka/interface/event-publisher.base';
import { CategoryDomainEntity } from '../../entities/category.domain-entity';

/**
 * clase abstracta para publicar el evento de estado de categoría modificado
 *
 * @export
 * @abstract
 * @class ChangedStateCategoryEventPublisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
export abstract class ChangedStateCategoryEventPublisher<
  Response = CategoryDomainEntity,
> extends EventPublisherBase<Response> {
  /**
   * publica el evento de estado de categoría modificado
   *
   * @template Result
   * @return {Promise<Result>} retorna una promesa con el resultado
   * @memberof ChangedStateCategoryEventPublisher
   */
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'producto.estado-categoría-modificado',
      JSON.stringify(this.response),
    );
  }
}
