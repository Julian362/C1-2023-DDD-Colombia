import { IGetItemCommand } from '@context/product/domain/interfaces';

export class GetItemCommand implements IGetItemCommand {
  itemId: string;
}
