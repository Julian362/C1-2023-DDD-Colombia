import { EventPublisherBase } from 'src/shared/sofka/interface/event-publisher.base';
import { SellerDomainEntity } from '../../entities/seller.domain-entity';
export abstract class ChangedStateSellerEventPublisher<
  Response = SellerDomainEntity,
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'producto.estado-vendedor-modificado',
      JSON.stringify(this.response),
    );
  }
}
