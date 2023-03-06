import { IErrorValueObject, ValueObjectBase } from 'src/shared/sofka';
import { IsBoolean } from '../../../validations/is-boolean.validation';
/**
 *  clase abstracta que representa un valor booleano estado en el dominio
 *
 * @export
 * @abstract
 * @class StateValueObjectBase
 * @extends {ValueObjectBase<boolean>}
 */
export abstract class StateValueObjectBase extends ValueObjectBase<boolean> {
  /**
   * valida los valores del objeto
   *
   * @memberof StateValueObjectBase
   */
  validateData(): void {
    if (this.value) {
      this.validateContent();
    }
  }

  /**
   *  valida si el valor es un booleano
   *
   * @private
   * @memberof StateValueObjectBase
   */
  private validateContent(): void {
    if (IsBoolean(this.value)) {
      this.setError({
        field: this.getFieldName(),
        message: `El campo ${this.getFieldName()} debe ser un booleano`,
      } as IErrorValueObject);
    }
  }

  /**
   *  retorna el nombre del campo
   *
   * @protected
   * @abstract
   * @return {*}  {string}
   * @memberof StateValueObjectBase
   */
  protected abstract getFieldName(): string;
}
