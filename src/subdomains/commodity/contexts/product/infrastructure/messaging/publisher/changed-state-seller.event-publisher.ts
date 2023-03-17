import { ChangedStateSellerEventPublisher } from '@context/product/domain/events';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IEventPublisher } from '@sofka';
import { lastValueFrom } from 'rxjs';
import { SellerEntity } from '../../persistence/entities/seller.entity';
/**
 * evento de cambio de estado de un vendedor  que se conecta con kafka
 *
 * @export
 * @class ChangedStateSellerPublisher
 * @extends {ChangedStateSellerEventPublisher}
 */
@Injectable()
export class ChangedStateSellerPublisher extends ChangedStateSellerEventPublisher {
  constructor(@Inject('PRODUCT_CONTEXT') private readonly proxy: ClientProxy) {
    super(proxy as unknown as IEventPublisher);
  }

  /**
   * emite el evento de cambio de estado de un vendedor
   *
   * @template Result
   * @template Input
   * @param {*} pattern
   * @param {Input} data
   * @return {*}  {Promise<Result>}
   * @memberof ChangedStateSellerPublisher
   */
  emit<Result = any, Input = SellerEntity>(
    pattern: any,
    data: Input,
  ): Promise<Result> {
    return lastValueFrom(this.proxy.emit(pattern, data));
  }
}
