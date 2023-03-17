import { CreatedSellerEventPublisher } from '@context/product/domain/events/publishers/created-seller.event-publisher';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IEventPublisher } from '@sofka';
import { lastValueFrom } from 'rxjs';
import { ItemEntity } from '../../persistence/entities/item.entity';
/**
 * evento de creacion de vendedor que se conecta con kafka
 *
 * @export
 * @class CreatedSellerPublisher
 * @extends {CreatedSellerEventPublisher}
 */
@Injectable()
export class CreatedSellerPublisher extends CreatedSellerEventPublisher {
  constructor(@Inject('PRODUCT_CONTEXT') private readonly proxy: ClientProxy) {
    super(proxy as unknown as IEventPublisher);
  }

  /**
   * emite el evento de creacion de vendedor
   *
   * @template Result
   * @template Input
   * @param pattern
   * @param {Input} data
   * @return  {Promise<Result>}
   * @memberof CreatedSellerPublisher
   */
  emit<Result = any, Input = ItemEntity>(
    pattern: any,
    data: Input,
  ): Promise<Result> {
    return lastValueFrom(this.proxy.emit(pattern, data));
  }
}
