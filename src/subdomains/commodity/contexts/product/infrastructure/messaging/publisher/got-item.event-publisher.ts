import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IEventPublisher } from '@sofka';
import { lastValueFrom } from 'rxjs';
import { ItemEntity } from '../../persistence/entities/item.entity';
import { GotItemEventPublisher } from '../../../domain/events/publishers/got-item.event-publisher';
/**
 * evento de obtener item que se conecta con kafka
 *
 * @export
 * @class GotItemPublisher
 * @extends {GotItemEventPublisher}
 */
@Injectable()
export class GotItemPublisher extends GotItemEventPublisher {
  constructor(@Inject('PRODUCT_CONTEXT') private readonly proxy: ClientProxy) {
    super(proxy as unknown as IEventPublisher);
  }

  /**
   * emite el evento de obtener item
   *
   * @template Result
   * @template Input
   * @param pattern
   * @param {Input} data
   * @return  {Promise<Result>}
   * @memberof GotItemPublisher
   */
  emit<Result = any, Input = ItemEntity>(
    pattern: any,
    data: Input,
  ): Promise<Result> {
    return lastValueFrom(this.proxy.emit(pattern, data));
  }
}
