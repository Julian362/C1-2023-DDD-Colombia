import { StringValueObjectBase } from '@ValueObjectBase';

/**
 *  clase que representa la descripción de la categoría
 *
 * @export
 * @class DescriptionCategory
 * @extends {StringValueObjectBase}
 */
export class DescriptionCategoryValueObject extends StringValueObjectBase {
  /**
   * retorna el número mínimo de caracteres
   *
   *
   * @return {number} retorna el número mínimo de caracteres
   * @memberof DescriptionCategoryValueObject
   */
  getMinLength(): number {
    return 3;
  }
  /**
   * retorna el número máximo de caracteres
   *
   *
   * @return {number} retorna el número máximo de caracteres
   * @memberof DescriptionCategoryValueObject
   */
  getMaxLength(): number {
    return 300;
  }
  /**
   *  retorna el nombre del campo
   *
   *
   * @return {string} retorna el nombre del campo
   * @memberof DescriptionCategory
   */
  getFieldName(): string {
    return 'description';
  }

  /**
   *  crea una instancia de DescriptionCategory
   * @param {string} value valor de la descripción
   * @memberof DescriptionCategory
   */
  constructor(value: string) {
    super(value);
  }
}
