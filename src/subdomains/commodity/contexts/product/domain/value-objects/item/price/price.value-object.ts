import { ValueObjectBase } from 'src/shared/sofka';
import { IErrorValueObject } from '../../../../../../../../shared/sofka/interface/error-object-value.interface';
import { IsPositiveNumber } from '../../../../../../../../shared/validations/is-positive.validation';

/**
 *  clase que representa el precio de un producto
 *
 * @export
 * @class PriceValueObject
 * @extends {ValueObjectBase<number>}
 */
export class PriceValueObject extends ValueObjectBase<number> {
  /**
   *  crea una instancia de PriceValueObject
   *
   * @memberof PriceValueObject
   */
  validateData(): void {
    if (this.value) {
      this.isPositiveNumber();
    }
  }

  /**
   *  valida si el valor es un número positivo
   *
   * @private
   * @memberof PriceValueObject
   */
  private isPositiveNumber(): void {
    if (!IsPositiveNumber(this.value)) {
      this.setError({
        field: 'price',
        message: 'El precio debe ser un número positivo',
      } as IErrorValueObject);
    }
  }
}
