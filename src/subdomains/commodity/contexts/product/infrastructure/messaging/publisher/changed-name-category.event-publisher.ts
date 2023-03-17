import { ChangedNameEventPublisher } from '@context/product/domain/events';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IEventPublisher } from '@sofka';
import { lastValueFrom } from 'rxjs';
import { CategoryEntity } from '../../persistence/entities/category.entity';
/**
 * evento de cambio de nombre de categoria que se comunica con kafka
 *
 * @export
 * @class ChangedNamePublisher
 * @extends {ChangedNameEventPublisher}
 */
@Injectable()
export class ChangedNamePublisher extends ChangedNameEventPublisher {
  constructor(@Inject('PRODUCT_CONTEXT') private readonly proxy: ClientProxy) {
    super(proxy as unknown as IEventPublisher);
  }

  /**
   * emite el evento de cambio de nombre de categoria
   *
   * @template Result
   * @template Input
   * @param pattern
   * @param {Input} data
   * @return  {Promise<Result>}
   * @memberof ChangedNamePublisher
   */
  emit<Result = any, Input = CategoryEntity>(
    pattern: any,
    data: Input,
  ): Promise<Result> {
    return lastValueFrom(this.proxy.emit(pattern, data));
  }
}
