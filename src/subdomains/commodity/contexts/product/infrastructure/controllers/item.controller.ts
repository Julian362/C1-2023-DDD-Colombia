import { Body, Controller, Post } from '@nestjs/common';
import { ItemService } from '../persistence/services/item.service';
import { CreatedItemPublisher } from '../messaging/publisher/created-item.event-publisher';
import { CreateItemCommand } from '../utils/commands/create-item.command';
import { CreateItemUseCase } from '@context/product/applications';

@Controller('item')
export class ItemController {
  constructor(
    private readonly itemService: ItemService,
    private readonly createdItemPublisher: CreatedItemPublisher,
  ) {}

  @Post()
  async createItem(@Body() command: CreateItemCommand) {
    const useCase = new CreateItemUseCase(
      this.itemService,
      this.createdItemPublisher,
    );

    return await useCase.execute(command);
  }
}
