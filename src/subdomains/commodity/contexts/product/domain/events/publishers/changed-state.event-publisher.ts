import { EventPublisherBase } from 'src/shared/sofka/interface/event-publisher.base';
import { ItemDomainEntity } from '../../entities/item.domain-entity';
export abstract class ChangedStateEventPublisher<
  Response = ItemDomainEntity,
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'producto.estado-modificado',
      JSON.stringify(this.response),
    );
  }
}
