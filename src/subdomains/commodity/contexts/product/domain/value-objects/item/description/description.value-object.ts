import { StringValueObjectBase } from 'src/shared/domain/value-object/string/string.value-object';

/**
 *  clase que representa la descripción del item
 *
 * @export
 * @class DescriptionValueObject
 * @extends {StringValueObjectBase}
 */
export class DescriptionValueObject extends StringValueObjectBase {
  /**
   *  crea una instancia de DescriptionValueObject
   * @param {string} value
   * @memberof DescriptionValueObject
   */
  constructor(value: string) {
    super(value, { minLength: 5, maxLength: 300 });
  }

  /**
   *  retorna el nombre del campo
   *
   * @protected
   * @return {*}  {string}
   * @memberof DescriptionValueObject
   */
  protected getFieldName(): string {
    return 'description';
  }
}
