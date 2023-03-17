import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IEventPublisher } from '@sofka';
import { lastValueFrom } from 'rxjs';
import { CategoryEntity } from '../../persistence/entities/category.entity';
import { ChangedStateEventPublisher } from '@context/product/domain/events';
/**
 * evento de cambio de estado de categoria
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
   *  emite el evento de cambio de estado de categoria
   *
   * @template Result
   * @template Input
   * @param pattern
   * @param {Input} data
   * @return  {Promise<Result>}
   * @memberof ChangedStatePublisher
   */
  emit<Result = any, Input = CategoryEntity>(
    pattern: any,
    data: Input,
  ): Promise<Result> {
    return lastValueFrom(this.proxy.emit(pattern, data));
  }
}
