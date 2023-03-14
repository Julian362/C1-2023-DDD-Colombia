import { IErrorValueObject, ValueObjectBase } from '@sofka';
import { IsEmpty, IsPositiveNumber } from '@validations';

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
