import { EventPublisherBase } from 'src/shared/sofka/interface/event-publisher.base';
import { ItemDomainEntity } from '../../entities/item.domain-entity';
export abstract class GotItemEventPublisher<
  Response = ItemDomainEntity,
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit('producto.item-obtenido', JSON.stringify(this.response));
  }
}
