import { EventPublisherBase } from 'src/shared/sofka/interface/event-publisher.base';
import { ItemDomainEntity } from '../../entities/item.domain-entity';
export abstract class DecreasePriceEventPublisher<
  Response = ItemDomainEntity,
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'producto.precio-disminuido',
      JSON.stringify(this.response),
    );
  }
}
