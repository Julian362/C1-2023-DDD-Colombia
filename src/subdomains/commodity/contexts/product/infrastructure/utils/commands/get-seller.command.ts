import { IGetSellerCommand } from '@context/product/domain/interfaces/commands/get-seller.command';

export class GetSellerCommand implements IGetSellerCommand {
  sellerId: string;
}
