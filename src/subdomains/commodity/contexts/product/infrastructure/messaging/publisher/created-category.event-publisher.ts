import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IEventPublisher } from '@sofka';
import { lastValueFrom } from 'rxjs';
import { ItemEntity } from '../../persistence/entities/item.entity';
import { ChangedDescriptionCategoryEventPublisher } from '../../../domain/events/publishers/changed-description-category.event-publisher';
import { CategoryEntity } from '../../persistence/entities/category.entity';
import { CreatedCategoryEventPublisher } from '@context/product/domain/events/publishers/created-category.event-publisher';
/**
 * evento de cambio de descripcion de categoria que se comunica con kafka
 *
 * @export
 * @class CreatedCategoryPublisher
 * @extends {CreatedCategoryEventPublisher}
 */
@Injectable()
export class CreatedCategoryPublisher extends CreatedCategoryEventPublisher {
  constructor(@Inject('PRODUCT_CONTEXT') private readonly proxy: ClientProxy) {
    super(proxy as unknown as IEventPublisher);
  }

  /**
   * emite el evento de cambio de descripcion de categoria
   *
   * @template Result
   * @template Input
   * @param pattern
   * @param {Input} data
   * @return  {Promise<Result>}
   * @memberof CreatedCategoryPublisher
   */
  emit<Result = any, Input = CategoryEntity>(
    pattern: any,
    data: Input,
  ): Promise<Result> {
    return lastValueFrom(this.proxy.emit(pattern, data));
  }
}
