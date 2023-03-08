import { EventPublisherBase } from 'src/shared/sofka/interface/event-publisher.base';
import { SellerDomainEntity } from '../../entities/seller.domain-entity';

export abstract class ChangedEmailSellerEventPublisher<
  Response = SellerDomainEntity,
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'producto.email-vendedor-modificado',
      JSON.stringify(this.response),
    );
  }
}
