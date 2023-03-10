import { StringValueObjectBase } from 'src/shared/domain/value-object/string/string.value-object';

/**
 *  clase que representa el nombre de la categoría
 *
 * @export
 * @class NameCategoryValueObject
 * @extends {StringValueObjectBase}
 */
export class NameCategoryValueObject extends StringValueObjectBase {
  /**
   * retorna el nombre del campo
   *
   * @protected
   * @return {string} retorna el nombre del campo
   * @memberof NameCategoryValueObject
   */
  protected getFieldName(): string {
    return 'name';
  }

  /**
   *  crea una instancia de NameCategoryValueObject
   * @param {string} value valor del nombre
   * @memberof NameCategoryValueObject
   */
  constructor(value: string) {
    super(value);
  }
}
