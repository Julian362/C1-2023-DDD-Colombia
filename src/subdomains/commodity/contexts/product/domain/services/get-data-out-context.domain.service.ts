import { IDataNameForCategory } from '../interfaces/data-out-context/data-for-category.interface';
/**
 * interfaz para el servicio de contexto de salida de datos
 *
 * @export
 * @interface GetDataOutContextDomainService
 */
export interface GetDataOutContextDomainService {
  /**
   * obtiene los datos para una categoría por su nombre
   *
   * @param {string} name nombre de la categoría
   * @return {Promise<IDataNameForCategory>} datos de la categoría
   * @memberof GetDataOutContextDomainService
   */
  getDataForCategory(name: string): Promise<IDataNameForCategory>;
}
