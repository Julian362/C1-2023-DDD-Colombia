import { StringValueObjectBase } from 'src/shared/domain/value-object/string/string.value-object';

/**
 *  clase que representa el nombre de la categoría
 *
 * @export
 * @class NameValueObject
 * @extends {StringValueObjectBase}
 */
export class NameValueObject extends StringValueObjectBase {
  /**
   * retorna el nombre del campo
   *
   * @protected
   * @return {*}  {string}
   * @memberof NameValueObject
   */
  protected getFieldName(): string {
    return 'name';
  }

  /**
   *  crea una instancia de NameValueObject
   * @param {string} value
   * @memberof NameValueObject
   */
  constructor(value: string) {
    super(value);
  }
}
