import { EventPublisherBase } from '../../../../../../../shared/sofka/interface/event-publisher.base';
import { CategoryDomainEntity } from '../../entities/category.domain-entity';

export abstract class ChangedDescriptionCategoryEventPublisher<
  Response = CategoryDomainEntity,
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'producto.descripción-categoría-modificado',
      JSON.stringify(this.response),
    );
  }
}
