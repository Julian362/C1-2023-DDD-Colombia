import { ValueObjectBase } from '../../../../../../../../shared/sofka/bases/object-value.base';
import { IsEmail } from '../../../../../../../../shared/validations/is-email.validation';
import { IErrorValueObject } from 'src/shared/sofka';
import { ContainForbiddenWords } from '../../../../../../../../shared/validations/forbidden-words.validation';
import { StringMaxLength } from '../../../../../../../../shared/validations/string-max-length.validation';
/**
 *  clase que representa el email del vendedor
 *
 * @export
 * @class EmailValueObject
 * @extends {ValueObjectBase<string>}
 */
export class EmailValueObject extends ValueObjectBase<string> {
  /**
   *  crea una instancia de EmailValueObject
   * @param {string} value valor del email
   * @memberof EmailValueObject
   */
  constructor(value: string) {
    super(value);
  }

  /**
   *  llama las validaciones
   *
   * @memberof EmailValueObject
   */
  validateData(): void {
    if (this.value) {
      this.ValidateStructure();
      this.forbiddenWords();
      this.maxLength();
    }
  }

  /**
   *  retorna el nombre del campo
   *
   * @private
   * @memberof EmailValueObject
   */
  private ValidateStructure() {
    if (IsEmail(this.value)) {
      this.setError({
        field: 'email',
        message: `El email no tiene un formato válido`,
      } as IErrorValueObject);
    }
  }

  /**
   *  valida si tiene palabras prohibidas
   *
   * @private
   * @memberof EmailValueObject
   */
  private forbiddenWords() {
    if (ContainForbiddenWords(this.value)) {
      this.setError({
        field: 'email',
        message: `El email contiene palabras prohibidas`,
      } as IErrorValueObject);
    }
  }

  /**
   *  valida si tiene mas de 100 caracteres
   *
   * @private
   * @memberof EmailValueObject
   */
  private maxLength() {
    if (StringMaxLength(this.value, 100)) {
      this.setError({
        field: 'email',
        message: `El email no puede tener más de 100 caracteres`,
      } as IErrorValueObject);
    }
  }
}
