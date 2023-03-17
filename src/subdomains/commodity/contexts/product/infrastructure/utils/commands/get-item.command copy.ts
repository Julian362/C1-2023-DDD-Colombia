import { IGetItemCommand } from '@context/product/domain/interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class GetItemCommand implements IGetItemCommand {
  @ApiProperty()
  itemId: string;
}
