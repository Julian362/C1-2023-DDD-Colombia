import { EventPublisherBase } from '../../../../../../../shared/sofka/interface/event-publisher.base';
import { CategoryDomainEntity } from '../../entities/category.domain-entity';
import { Publisher } from './enums/publisher.enum';

/**
 * clase abstracta para publicar el evento de cambio de la descripción del item
 *
 * @export
 * @abstract
 * @class ChangedDescriptionCategoryEventPublisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
export abstract class ChangedDescriptionCategoryEventPublisher<
  Response = CategoryDomainEntity,
> extends EventPublisherBase<Response> {
  /**
   * publica el evento de cambio de la descripción de la categoría
   *
   * @template Result
   * @return {Promise<Result>} retorna una promesa con el resultado
   * @memberof ChangedDescriptionCategoryEventPublisher
   */
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      Publisher.ChangedDescriptionCategory,
      JSON.stringify(this.response),
    );
  }
}
