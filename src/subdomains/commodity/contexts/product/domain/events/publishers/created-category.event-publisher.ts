import { EventPublisherBase } from '@sofka';
import { CategoryDomainEntity } from '../../entities/category.domain-entity';
import { Publisher } from './enums/publisher.enum';
/**
 * clase abstracta para publicar el evento de category creado
 *
 * @export
 * @abstract
 * @class CreatedCategoryEventPublisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
/**
 *
 *
 * @export
 * @abstract
 * @class CreatedCategoryEventPublisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
export abstract class CreatedCategoryEventPublisher<
  Response = CategoryDomainEntity,
> extends EventPublisherBase<Response> {
  /**
   * Publica el evento de category creado
   *
   * @template Result
   * @return {Promise<Result>} retorna una promesa con el resultado
   * @memberof CreatedCategoryEventPublisher
   */
  publish<Result = any>(): Promise<Result> {
    return this.emit(Publisher.CreatedCategory, JSON.stringify(this.response));
  }
}
