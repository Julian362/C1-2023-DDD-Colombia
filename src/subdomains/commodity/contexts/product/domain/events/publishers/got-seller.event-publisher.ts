import { EventPublisherBase } from 'src/shared/sofka/interface/event-publisher.base';
import { SellerDomainEntity } from '../../entities/seller.domain-entity';
export abstract class GotSellerEventPublisher<
  Response = SellerDomainEntity,
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'producto.vendedor-obtenido',
      JSON.stringify(this.response),
    );
  }
}
