import { IGetSellerCommand } from '@context/product/domain/interfaces/commands/get-seller.command';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class GetSellerCommand implements IGetSellerCommand {
  @ApiProperty()
  sellerId: string;
}
