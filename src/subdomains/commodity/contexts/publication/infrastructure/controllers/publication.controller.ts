import {
  ICreatedITemResponse,
  IGotITemResponse,
} from '@context/product/domain/interfaces';
import { Controller } from '@nestjs/common';
import { IGotSellerResponse } from '../../../product/domain/interfaces/responses/got-seller.response';
import { IGotCategoryResponse } from '../../../product/domain/interfaces/responses/got-category.response';
import {
  Ctx,
  EventPattern,
  KafkaContext,
  Payload,
} from '@nestjs/microservices';
@Controller()
export class PublicationController {
  @EventPattern('product.created-item')
  getCreatedItem(
    @Payload() data: ICreatedITemResponse,
    @Ctx() context: KafkaContext,
  ) {
    this.showData(data, context, 'Created Item');
  }

  @EventPattern('product.got-item')
  getGotItem(@Payload() data: IGotITemResponse, @Ctx() context: KafkaContext) {
    this.showData(data, context, 'Got Item');
  }

  @EventPattern('product.got-seller')
  getGotItemSeller(
    @Payload() data: IGotSellerResponse,
    @Ctx() context: KafkaContext,
  ) {
    this.showData(data, context, 'Got Item Seller');
  }

  @EventPattern('product.got-category')
  getGotItemCategory(
    @Payload() data: IGotCategoryResponse,
    @Ctx() context: KafkaContext,
  ) {
    this.showData(data, context, 'Got Item Category');
  }

  showData(data: any, context: KafkaContext, mensaje: string) {
    console.log('__________________________________________');
    console.log(mensaje.toUpperCase());
    console.log('__________________________________________');
    console.log('Data: ', data);
    console.log('__________________________________________');
    console.log(context);
  }
}
