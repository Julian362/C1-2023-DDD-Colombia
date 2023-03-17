import { ChangedDescriptionCategoryEventPublisher } from '@context/product/domain/events';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IEventPublisher } from '@sofka';
import { lastValueFrom } from 'rxjs';
import { ItemEntity } from '../../persistence/entities/item.entity';
/**
 *  publicador que se conecta a kafka para emitir el evento de cambio de descripcion de categoria
 *
 * @export
 * @class ChangedDescriptionCategoryPublisher
 * @extends {ChangedDescriptionCategoryEventPublisher}
 */
@Injectable()
export class ChangedDescriptionCategoryPublisher extends ChangedDescriptionCategoryEventPublisher {
  constructor(@Inject('PRODUCT_CONTEXT') private readonly proxy: ClientProxy) {
    super(proxy as unknown as IEventPublisher);
  }

  /**
   * metodo que emite el evento de cambio de descripcion de categoria
   *
   * @template Result
   * @template Input
   * @param pattern
   * @param {Input} data
   * @return {Promise<Result>}
   * @memberof ChangedDescriptionCategoryPublisher
   */
  emit<Result = any, Input = ItemEntity>(
    pattern: any,
    data: Input,
  ): Promise<Result> {
    return lastValueFrom(this.proxy.emit(pattern, data));
  }
}
