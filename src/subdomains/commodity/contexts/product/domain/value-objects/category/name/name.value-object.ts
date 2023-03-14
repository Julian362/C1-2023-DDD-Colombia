import { StringValueObjectBase } from '@ValueObjectBase';

/**
 *  clase que representa el nombre de la categoría
 *
 * @export
 * @class NameCategoryValueObject
 * @extends {StringValueObjectBase}
 */
export class NameCategoryValueObject extends StringValueObjectBase {
  /**
   * retorna el número mínimo de caracteres
   *
   *
   * @return {number}
   * @memberof NameCategoryValueObject
   */
  getMinLength(): number {
    return 3;
  }
  /**
   * retorna el número máximo de caracteres
   *
   *
   * @return {number} retorna el número máximo de caracteres
   * @memberof NameCategoryValueObject
   */
  getMaxLength(): number {
    return 30;
  }
  /**
   * retorna el nombre del campo
   *
   *
   * @return {string} retorna el nombre del campo
   * @memberof NameCategoryValueObject
   */
  getFieldName(): string {
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
