import { EventPublisherBase } from 'src/shared/sofka/interface/event-publisher.base';
import { CategoryDomainEntity } from '../../entities/category.domain-entity';

export abstract class ChangedStateCategoryEventPublisher<
  Response = CategoryDomainEntity,
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'producto.estado-categoría-modificado',
      JSON.stringify(this.response),
    );
  }
}
