import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
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
import { AuthGuard } from '../utils/guards/auth/auth.guard';
import { ApiTags } from '@nestjs/swagger/dist';

/**
 *  controlador para manejar los items
 *
 * @export
 * @class ItemController
 */
@Controller('item')
@ApiTags('item')
export class ItemController {
  constructor(
    private readonly itemService: ItemService,
    private readonly createdItemPublisher: CreatedItemPublisher,
    private readonly getItemPublisher: GotItemPublisher,
  ) {}

  /**
   *  crea un item
   *
   * @param {CreateItemCommand} command comando para crear un item
   * @return {Promise<ICreatedITemResponse>} respuesta de la creacion del item
   * @memberof ItemController
   */
  @Post()
  @UseGuards(AuthGuard)
  async createItem(
    @Body() command: CreateItemCommand,
  ): Promise<ICreatedITemResponse> {
    const useCase = new CreateItemUseCase(
      this.itemService,
      this.createdItemPublisher,
    );

    return await useCase.execute(command);
  }
  /**
   * obtiene un item por su id
   *
   * @param {GetItemCommand} command comando para obtener un item
   * @return {Promise<IGotITemResponse>} respuesta de la obtencion del item
   * @memberof ItemController
   */
  @Get()
  @UseGuards(AuthGuard)
  async getItem(@Body() command: GetItemCommand): Promise<IGotITemResponse> {
    const useCase = new GetItemUseCase(this.itemService, this.getItemPublisher);

    return await useCase.execute(command);
  }
}
