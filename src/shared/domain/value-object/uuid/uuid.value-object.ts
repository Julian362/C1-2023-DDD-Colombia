import { IsUUID } from '@validations';
import { IErrorValueObject, ValueObjectBase } from '@sofka';

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
      this.validateUUID();
    }
  }

  /**
   *  valida si el valor es un uuid
   *
   * @private
   * @memberof UUIDValueObjectBase
   */
  private validateUUID(): void {
    if (!IsUUID(this.value)) {
      this.setError({
        field: this.getFieldName(),
        message: `El campo ${this.getFieldName()} debe ser un uuid válido`,
      } as IErrorValueObject);
    }
  }
  /**
   *  método abstracto que retorna el nombre del campo
   *
   * @protected
   * @abstract
   * @return {string} retorna el nombre del campo
   * @memberof UUIDValueObjectBase
   */
  protected abstract getFieldName(): string;
}
