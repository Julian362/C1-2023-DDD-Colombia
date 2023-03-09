import { StringValueObjectBase } from 'src/shared/domain/value-object/string/string.value-object';

/**
 *  clase que representa un valor string en el dominio
 *
 * @export
 * @class DescriptionValueObject
 * @extends {StringValueObjectBase}
 */
export class DescriptionValueObject extends StringValueObjectBase {
  /**
   *  crea una instancia de DescriptionValueObject
   * @param {string} value valor de la descripción
   * @memberof DescriptionValueObject
   */
  constructor(value: string) {
    super(value, { minLength: 5, maxLength: 300 });
  }

  /**
   *  retorna el nombre del campo
   *
   * @protected
   * @return {string} retorna el nombre del campo
   * @memberof DescriptionValueObject
   */
  protected getFieldName(): string {
    return 'description';
  }
}
