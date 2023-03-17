import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IEventPublisher } from '@sofka';
import { lastValueFrom } from 'rxjs';
import { ItemEntity } from '../../persistence/entities/item.entity';
import { ChangedDescriptionCategoryEventPublisher } from '../../../domain/events/publishers/changed-description-category.event-publisher';
/**
 * evento de cambio de descripcion de categoria publicador que se conecta con kafka
 *
 * @export
 * @class ChangedDescriptionPublisher
 * @extends {ChangedDescriptionCategoryEventPublisher}
 */
@Injectable()
export class ChangedDescriptionPublisher extends ChangedDescriptionCategoryEventPublisher {
  constructor(@Inject('PRODUCT_CONTEXT') private readonly proxy: ClientProxy) {
    super(proxy as unknown as IEventPublisher);
  }

  /**
   * emite el evento de cambio de descripcion de categoria
   *
   * @template Result
   * @template Input
   * @param {*} pattern
   * @param {Input} data
   * @return {*}  {Promise<Result>}
   * @memberof ChangedDescriptionPublisher
   */
  emit<Result = any, Input = ItemEntity>(
    pattern: any,
    data: Input,
  ): Promise<Result> {
    return lastValueFrom(this.proxy.emit(pattern, data));
  }
}
