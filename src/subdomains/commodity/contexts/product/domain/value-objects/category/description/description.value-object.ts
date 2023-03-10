import { StringValueObjectBase } from 'src/shared/domain/value-object/string/string.value-object';

/**
 *  clase que representa la descripción de la categoría
 *
 * @export
 * @class DescriptionCategory
 * @extends {StringValueObjectBase}
 */
export class DescriptionCategoryValueObject extends StringValueObjectBase {
  /**
   *  retorna el nombre del campo
   *
   * @protected
   * @return {string} retorna el nombre del campo
   * @memberof DescriptionCategory
   */
  protected getFieldName(): string {
    return 'description';
  }

  /**
   *  crea una instancia de DescriptionCategory
   * @param {string} value valor de la descripción
   * @memberof DescriptionCategory
   */
  constructor(value: string) {
    super(value, { minLength: 5, maxLength: 300 });
  }
}
