import { IncreasePriceEventPublisher } from '@context/product/domain/events';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IEventPublisher } from '@sofka';
import { lastValueFrom } from 'rxjs';
import { ItemEntity } from '../../persistence/entities/item.entity';
import { SellerEntity } from '../../persistence/entities/seller.entity';
/**
 * evento de aumento de precio de item que se conecta con kafka
 *
 * @export
 * @class IncreasedItemPublisher
 * @extends {IncreasePriceEventPublisher}
 */
@Injectable()
export class IncreasedItemPublisher extends IncreasePriceEventPublisher {
  constructor(@Inject('PRODUCT_CONTEXT') private readonly proxy: ClientProxy) {
    super(proxy as unknown as IEventPublisher);
  }

  /**
   * emite el evento de aumento de precio de item
   *
   * @template Result
   * @template Input
   * @param {*} pattern
   * @param {Input} data
   * @return {*}  {Promise<Result>}
   * @memberof IncreasedItemPublisher
   */
  emit<Result = any, Input = SellerEntity>(
    pattern: any,
    data: Input,
  ): Promise<Result> {
    return lastValueFrom(this.proxy.emit(pattern, data));
  }
}
