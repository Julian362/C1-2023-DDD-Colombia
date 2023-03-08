import { EventPublisherBase } from '../../../../../../../shared/sofka/interface/event-publisher.base';
import { SellerDomainEntity } from '../../entities/seller.domain-entity';
export abstract class ChangedNameSellerEventPublisher<
  Response = SellerDomainEntity,
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'producto.nombre-vendedor-modificado',
      JSON.stringify(this.response),
    );
  }
}
