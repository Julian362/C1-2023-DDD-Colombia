import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IEventPublisher } from '@sofka';
import { lastValueFrom } from 'rxjs';
import { ItemEntity } from '../../persistence/entities/item.entity';
import { GotSellerEventPublisher } from '../../../domain/events/publishers/got-seller.event-publisher';
import { SellerEntity } from '../../persistence/entities/seller.entity';
/**
 * evento de obtener vendedor que se conecta con kafka
 *
 * @export
 * @class GotSellerPublisher
 * @extends {GotSellerEventPublisher}
 */
@Injectable()
export class GotSellerPublisher extends GotSellerEventPublisher {
  constructor(@Inject('PRODUCT_CONTEXT') private readonly proxy: ClientProxy) {
    super(proxy as unknown as IEventPublisher);
  }

  /**
   * emite el evento de obtener vendedor
   *
   * @template Result
   * @template Input
   * @param pattern
   * @param {Input} data
   * @return  {Promise<Result>}
   * @memberof GotSellerPublisher
   */
  emit<Result = any, Input = SellerEntity>(
    pattern: any,
    data: Input,
  ): Promise<Result> {
    return lastValueFrom(this.proxy.emit(pattern, data));
  }
}
