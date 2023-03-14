import { StringValueObjectBase } from '@ValueObjectBase';

/**
 *  clase que representa un valor string en el dominio
 *
 * @export
 * @class DescriptionValueObject
 * @extends {StringValueObjectBase}
 */
export class DescriptionValueObject extends StringValueObjectBase {
  /**
   * retorna el número mínimo de caracteres
   *
   *
   * @return {number} retorna el número mínimo de caracteres
   * @memberof DescriptionValueObject
   */
  getMinLength(): number {
    return 3;
  }
  /**
   * retorna el número máximo de caracteres
   *
   *
   * @return {number} retorna el número máximo de caracteres
   * @memberof DescriptionValueObject
   */
  getMaxLength(): number {
    return 300;
  }
  /**
   *  crea una instancia de DescriptionValueObject
   * @param {string} value valor de la descripción
   * @memberof DescriptionValueObject
   */
  constructor(value: string) {
    super(value);
  }

  /**
   *  retorna el nombre del campo
   *
   *
   * @return {string} retorna el nombre del campo
   * @memberof DescriptionValueObject
   */
  getFieldName(): string {
    return 'description';
  }
}
