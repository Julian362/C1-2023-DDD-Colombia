import { IErrorValueObject, ValueObjectBase } from 'src/shared/sofka';
import { ContainForbiddenWords } from 'src/shared/validations/forbidden-words.validation';
import { StringMaxLength } from 'src/shared/validations/string-max-length.validation';
import { StringMinLength } from 'src/shared/validations/string-min-length.validation';
import { IsEmpty } from '../../../validations/is-empty.validation';

/**
 *  clase abstracta que representa un valor string en el dominio
 *
 * @export
 * @abstract
 * @class StringValueObjectBase
 * @extends {ValueObjectBase<string>}
 */
export abstract class StringValueObjectBase extends ValueObjectBase<string> {
  private maxLength?: number;
  private minLength?: number;
  /**
   *  crea una instancia de StringValueObjectBase
   * @param {string} value
   * @param {{ maxLength?: number; minLength?: number }} { maxLength, minLength } opcionales
   * @memberof StringValueObjectBase
   */
  constructor(
    value: string,
    { maxLength, minLength }: { maxLength?: number; minLength?: number } = {},
  ) {
    super(value);
    this.maxLength = maxLength;
    this.minLength = minLength;
  }

  /**
   *  valida los valores del objeto
   *
   * @memberof StringValueObjectBase
   */
  validateData(): void {
    if (this.value) {
      this.isEmpty();
      this.isMaxLength();
      this.isMinLength();
      this.forbiddenWords();
    }
  }

  /**
   *  valida si el valor es vacío
   *
   * @private
   * @memberof StringValueObjectBase
   */
  private isEmpty(): void {
    if (IsEmpty(this.value)) {
      this.setError({
        field: this.getFieldName(),
        message: `El campo ${this.getFieldName()} no puede estar vacío`,
      } as IErrorValueObject);
    }
  }

  /**
   *  valida si el valor es menor al máximo de caracteres
   *
   * @private
   * @memberof StringValueObjectBase
   */
  private isMaxLength(): void {
    if (this.value && StringMaxLength(this.value, this.maxLength ?? 30)) {
      this.setError({
        field: this.getFieldName(),
        message: `El campo ${this.getFieldName()} no puede superar los 30 caracteres`,
      } as IErrorValueObject);
    }
  }

  /**
   *  valida si el valor es mayor al mínimo de caracteres
   *
   * @private
   * @memberof StringValueObjectBase
   */
  private isMinLength(): void {
    if (this.value && StringMinLength(this.value, this.minLength ?? 3)) {
      this.setError({
        field: this.getFieldName(),
        message: `El campo ${this.getFieldName()} debe tener al menos 3 caracteres`,
      } as IErrorValueObject);
    }
  }

  /**
   *  valida si el valor contiene palabras prohibidas
   *
   * @private
   * @memberof StringValueObjectBase
   */
  private forbiddenWords(): void {
    if (this.value && ContainForbiddenWords(this.value)) {
      this.setError({
        field: this.getFieldName(),
        message: `El campo ${this.getFieldName()} contiene palabras prohibidas`,
      } as IErrorValueObject);
    }
  }

  /**
   *  retorna el nombre del campo
   *
   * @protected
   * @abstract
   * @return {*}  {string}
   * @memberof StringValueObjectBase
   */
  protected abstract getFieldName(): string;
}
