import { ChangedNameSellerEventPublisher } from '@context/product/domain/events';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IEventPublisher } from '@sofka';
import { lastValueFrom } from 'rxjs';
import { ItemEntity } from '../../persistence/entities/item.entity';
import { SellerEntity } from '../../persistence/entities/seller.entity';
/**
 * evento de cambio de nombre de vendedor que se conecta con kafka
 *
 * @export
 * @class ChangedNameSellerPublisher
 * @extends {ChangedNameSellerEventPublisher}
 */
@Injectable()
export class ChangedNameSellerPublisher extends ChangedNameSellerEventPublisher {
  constructor(@Inject('PRODUCT_CONTEXT') private readonly proxy: ClientProxy) {
    super(proxy as unknown as IEventPublisher);
  }

  /**
   * emite el evento de cambio de nombre de vendedor
   *
   * @template Result
   * @template Input
   * @param {*} pattern
   * @param {Input} data
   * @return {*}  {Promise<Result>}
   * @memberof ChangedNameSellerPublisher
   */
  emit<Result = any, Input = SellerEntity>(
    pattern: any,
    data: Input,
  ): Promise<Result> {
    return lastValueFrom(this.proxy.emit(pattern, data));
  }
}
