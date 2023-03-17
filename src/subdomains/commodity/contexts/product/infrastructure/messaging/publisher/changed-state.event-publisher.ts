import { ChangedStateEventPublisher } from '@context/product/domain/events';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IEventPublisher } from '@sofka';
import { lastValueFrom } from 'rxjs';
import { ItemEntity } from '../../persistence/entities/item.entity';
/**
 * evento de cambio de estado de item que se comunica con kafka
 *
 * @export
 * @class ChangedStatePublisher
 * @extends {ChangedStateEventPublisher}
 */
@Injectable()
export class ChangedStatePublisher extends ChangedStateEventPublisher {
  constructor(@Inject('PRODUCT_CONTEXT') private readonly proxy: ClientProxy) {
    super(proxy as unknown as IEventPublisher);
  }

  /**
   * emite el evento de cambio de estado de item
   *
   * @template Result
   * @template Input
   * @param pattern
   * @param {Input} data
   * @return  {Promise<Result>}
   * @memberof ChangedStatePublisher
   */
  emit<Result = any, Input = ItemEntity>(
    pattern: any,
    data: Input,
  ): Promise<Result> {
    return lastValueFrom(this.proxy.emit(pattern, data));
  }
}
