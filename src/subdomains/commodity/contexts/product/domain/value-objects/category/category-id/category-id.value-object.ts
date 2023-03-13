import { UUIDValueObjectBase } from '@ValueObjectBase';
import { v4 as uuid } from 'uuid';

/**
 *  Clase que representa el id de la Categoría
 *
 * @export
 * @class CategoryIdValueObject
 * @extends {UUIDValueObjectBase}
 */
export class CategoryIdValueObject extends UUIDValueObjectBase {
  /**
   *  retorna el nombre del campo
   *
   * @protected
   * @return {string} retorna el nombre del campo
   * @memberof CategoryIdValueObject
   */
  protected getFieldName(): string {
    return 'categoryId';
  }
  /**
   *  crea una instancia de CategoryIdValueObject
   * @param {string} [value] valor del id de la categoría
   * @memberof CategoryIdValueObject
   */
  constructor(value?: string) {
    super(value ? value : uuid());
  }
}
