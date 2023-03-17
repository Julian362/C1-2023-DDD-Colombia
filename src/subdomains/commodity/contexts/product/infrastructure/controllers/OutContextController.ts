import { Controller, Get, Param } from '@nestjs/common';
import { IDataNameForCategory } from '@context/product/domain/interfaces';
@Controller('MercadoLibre')
export class OutContextController {
  @Get('desactive/:name')
  getSeller(@Param('name') name: string): IDataNameForCategory {
    if (name.toLowerCase() === 'mercadolibre') {
      const data = { state: false };
      return data;
    }
    const data = { state: true };
    return data;
  }
}
