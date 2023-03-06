import { v4 as uuid } from 'uuid';
import { UUIDValueObjectBase } from '../../../../../../../../shared/domain/value-object/uuid/uuid.value-object.spec';

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
   * @return {*}  {string}
   * @memberof CategoryIdValueObject
   */
  protected getFieldName(): string {
    return 'categoryId';
  }
  /**
   *  crea una instancia de CategoryIdValueObject
   * @param {string} [value]
   * @memberof CategoryIdValueObject
   */
  constructor(value?: string) {
    super(value ? value : uuid());
  }
}
