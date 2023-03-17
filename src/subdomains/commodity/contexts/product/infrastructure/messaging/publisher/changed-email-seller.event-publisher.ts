import { ChangedEmailSellerEventPublisher } from '@context/product/domain/events';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IEventPublisher } from '@sofka';
import { lastValueFrom } from 'rxjs';
import { ItemEntity } from '../../persistence/entities/item.entity';
import { SellerEntity } from '../../persistence/entities/seller.entity';
/**
 * evento de cambio de email de vendedor que se conecta con kafka
 *
 * @export
 * @class ChangedEmailSellerPublisher
 * @extends {ChangedEmailSellerEventPublisher}
 */
@Injectable()
export class ChangedEmailSellerPublisher extends ChangedEmailSellerEventPublisher {
  constructor(@Inject('PRODUCT_CONTEXT') private readonly proxy: ClientProxy) {
    super(proxy as unknown as IEventPublisher);
  }

  /**
   * emite el evento de cambio de email de vendedor
   *
   * @template Result
   * @template Input
   * @param {*} pattern
   * @param {Input} data
   * @return {*}  {Promise<Result>}
   * @memberof ChangedEmailSellerPublisher
   */
  emit<Result = any, Input = SellerEntity>(
    pattern: any,
    data: Input,
  ): Promise<Result> {
    return lastValueFrom(this.proxy.emit(pattern, data));
  }
}
