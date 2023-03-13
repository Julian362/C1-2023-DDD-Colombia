import { ValueObjectBase, IErrorValueObject } from '@sofka';
import { IsUrl, StringMaxLength } from '@validations';

/**
 *  clase que representa la imagen de un producto
 *
 * @export
 * @class ImageValueObject
 * @extends {ValueObjectBase<string>}
 */
export class ImageValueObject extends ValueObjectBase<string> {
  validateData(): void {
    if (this.value) {
      this.maxLength();
      this.isUrl();
    }
  }

  /**
   *  valida si el valor es una url válida
   *
   * @private
   * @memberof ImageValueObject
   */
  private isUrl(): void {
    if (IsUrl(this.value)) {
      this.setError({
        field: 'image',
        message:
          'La imagen debe ser una URL válida para un archivo de imagen (png, jpg, jpeg, gif)',
      } as IErrorValueObject);
    }
  }

  /**
   *  valida si el valor tiene un máximo de 255 caracteres
   *
   * @private
   * @memberof ImageValueObject
   */
  private maxLength() {
    if (StringMaxLength(this.value, 255)) {
      this.setError({
        field: 'image',
        message: 'La url de la imagen debe tener un máximo de 255 caracteres',
      } as IErrorValueObject);
    }
  }
}
