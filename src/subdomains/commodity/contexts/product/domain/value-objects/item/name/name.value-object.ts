import { StringValueObjectBase } from '@ValueObjectBase';

/**
 *  clase que representa el nombre del item
 *
 * @export
 * @class NameValueObject
 * @extends {StringValueObjectBase}
 */
export class NameValueObject extends StringValueObjectBase {
  /**
   * retorna el número mínimo de caracteres
   *
   * @return {number} retorna el número mínimo de caracteres
   * @memberof NameValueObject
   */
  getMinLength(): number {
    return 3;
  }
  /**
   * retorna el número máximo de caracteres
   *
   * @return {number} retorna el número máximo de caracteres
   * @memberof NameValueObject
   */
  getMaxLength(): number {
    return 30;
  }
  /**
   * retorna el nombre del campo
   *
   *
   * @return {string} nombre del campo
   * @memberof NameValueObject
   */
  getFieldName(): string {
    return 'name';
  }

  /**
   *  crea una instancia de NameValueObject
   * @param {string} value valor del nombre
   * @memberof NameValueObject
   */
  constructor(value: string) {
    super(value);
  }
}
