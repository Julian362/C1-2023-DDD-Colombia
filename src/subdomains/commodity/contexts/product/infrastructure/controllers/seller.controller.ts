import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { GetSellerCommand } from '../utils/commands/get-seller.command';
import { GetSellerUseCase } from '../../application/use-cases/get-seller/get-seller.use-case';
import { IGotSellerResponse } from '@context/product/domain/interfaces/responses/got-seller.response';
import { SellerService } from '../persistence/services/seller.service';
import { GotSellerPublisher } from '../messaging/publisher/got-seller.event-publisher';
import { AuthGuard } from '../utils/guards/auth/auth.guard';
@Controller('seller')
export class SellerController {
  constructor(
    private readonly sellerService: SellerService,
    private readonly gotSellerPublisher: GotSellerPublisher,
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  async getSeller(
    @Body() command: GetSellerCommand,
  ): Promise<IGotSellerResponse> {
    const useCase = new GetSellerUseCase(
      this.sellerService,
      this.gotSellerPublisher,
    );

    return await useCase.execute(command);
  }
}
