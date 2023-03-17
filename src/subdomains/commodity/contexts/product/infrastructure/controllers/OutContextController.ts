import { Controller, Get, Param } from '@nestjs/common';
import { IDataNameForCategory } from '@context/product/domain/interfaces';
/**
 * controlador para manejar el contexto entrada de datos externos
 *
 * @export
 * @class OutContextController
 */
@Controller('MercadoLibre')
export class OutContextController {
  /**
   * obtiene el estado de la categoria
   *
   * @param {string} name nombre de la categoria
   * @return {IDataNameForCategory} estado de la categoria
   * @memberof OutContextController
   */
  @Get('desactive/:name')
  getOut(@Param('name') name: string): IDataNameForCategory {
    if (name.toLowerCase() === 'mercadolibre') {
      const data = { state: false };
      return data;
    }
    const data = { state: true };
    return data;
  }
}
