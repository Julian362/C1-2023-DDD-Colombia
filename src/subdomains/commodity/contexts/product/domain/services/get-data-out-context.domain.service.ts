import { IDataNameForCategory } from '../interfaces/data-out-context/data-for-category.interface';
export interface GetDataOutContextDomainService {
  getDataForCategory(name: string): Promise<IDataNameForCategory>;
}
