import { IErrorValueObject, ValueObjectBase } from 'src/shared/sofka';
import { IsUUID } from '../../../validations/is-uuid.validation';

/**
 *  clase abstracta que representa un valor uuid
 *
 * @export
 * @abstract
 * @class UUIDValueObjectBase
 * @extends {ValueObjectBase<string>}
 */
export abstract class UUIDValueObjectBase extends ValueObjectBase<string> {
  /**
   *  valida los valores del objeto
   *
   * @memberof UUIDValueObjectBase
   */
  validateData(): void {
    if (this.value) {
      this.isEmpty();
      this.isUUID();
    }
  }

  /**
   *  valida si el valor es vacío
   *
   * @private
   * @memberof UUIDValueObjectBase
   */
  private isEmpty(): void {
    if (!this.value) {
      this.setError({
        field: this.getFieldName(),
        message: `El campo ${this.getFieldName()} no puede estar vacío`,
      } as IErrorValueObject);
    }
  }

  /**
   *  valida si el valor es un uuid
   *
   * @private
   * @memberof UUIDValueObjectBase
   */
  private isUUID(): void {
    if (IsUUID(this.value)) {
      this.setError({
        field: this.getFieldName(),
        message: `El campo ${this.getFieldName()} no puede estar vacío`,
      } as IErrorValueObject);
    }
  }
  /**
   *  retorna el nombre del campo
   *
   * @protected
   * @abstract
   * @return {*}  {string}
   * @memberof UUIDValueObjectBase
   */
  protected abstract getFieldName(): string;
}
