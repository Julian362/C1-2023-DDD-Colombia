import { CategoryDomainEntity } from '@context/product/domain/entities';
import { EventPublisherBase } from '@sofka';
import { Publisher } from '@context/product/domain/events/publishers';

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
      Publisher.ChangedStateCategory,
      JSON.stringify(this.response),
    );
  }
}
