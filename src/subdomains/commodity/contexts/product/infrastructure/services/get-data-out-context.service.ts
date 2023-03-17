import { IDataNameForCategory } from '@context/product/domain/interfaces/data-out-context/data-for-category.interface';
import { GetDataOutContextDomainService } from '@context/product/domain/services/get-data-out-context.domain.service';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

/**
 * servicio de dominio para obtener datos de la api externa
 *
 * @export
 * @class GetDataOutContextService
 * @implements {GetDataOutContextDomainService}
 */
@Injectable()
export class GetDataOutContextService
  implements GetDataOutContextDomainService
{
  constructor(private readonly httpService: HttpService) {}
  /**
   *  obtiene los datos de la api externa
   *
   * @param {string} name nombre de la categoria
   * @return  {Promise<IDataNameForCategory>} retorna una promesa con los datos
   * @memberof GetDataOutContextService
   */
  async getDataForCategory(name: string): Promise<IDataNameForCategory> {
    const data = await firstValueFrom(
      this.httpService.get<IDataNameForCategory>(
        'http://localhost:3000/MercadoLibre/desactive/' + name.toLowerCase(),
      ),
    );
    return data.data;
  }
}
