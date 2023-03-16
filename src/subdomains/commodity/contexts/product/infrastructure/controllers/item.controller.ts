import { Body, Controller, Get, Post } from '@nestjs/common';
import { ItemService } from '../persistence/services/item.service';
import { CreatedItemPublisher } from '../messaging/publisher/created-item.event-publisher';
import { CreateItemCommand } from '../utils/commands/create-item.command';
import { CreateItemUseCase } from '@context/product/applications';
import {
  ICreatedITemResponse,
  IGotITemResponse,
} from '@context/product/domain/interfaces';
import { GetItemCommand } from '../utils/commands/get-item.command copy';
import { GetItemUseCase } from '../../application/use-cases/get-item/get-item.use-case';
import { GotItemPublisher } from '../messaging/publisher/got-item.event-publisher';

@Controller('item')
export class ItemController {
  constructor(
    private readonly itemService: ItemService,
    private readonly createdItemPublisher: CreatedItemPublisher,
    private readonly getItemPublisher: GotItemPublisher,
  ) {}

  @Post()
  async createItem(
    @Body() command: CreateItemCommand,
  ): Promise<ICreatedITemResponse> {
    const useCase = new CreateItemUseCase(
      this.itemService,
      this.createdItemPublisher,
    );

    return await useCase.execute(command);
  }
  @Get()
  async getItem(@Body() command: GetItemCommand): Promise<IGotITemResponse> {
    const useCase = new GetItemUseCase(this.itemService, this.getItemPublisher);

    return await useCase.execute(command);
  }
}
