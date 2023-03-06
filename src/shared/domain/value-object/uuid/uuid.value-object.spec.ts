import { ValueObjectBase } from 'src/shared/sofka';
import { v4 as uuid } from 'uuid';
import { IsUUID } from 'src/shared/validations/is-uuid.validation';
import { IErrorValueObject } from 'src/shared/sofka/interface/error-object-value.interface';

export abstract class UUIDValueObjectBase extends ValueObjectBase<string> {
  constructor(value?: string) {
    super(value ? value : uuid());
  }

  validateData(): void {
    if (this.value) this.validateStructure();
  }

  private validateStructure(): void {
    if (this.value && !IsUUID(this.value)) {
      this.setError({
        field: this.getFieldName(),
        message: `El ${this.getFieldName()} no tiene un formato válido`,
      } as IErrorValueObject);
    }
  }
  protected abstract getFieldName(): string;
}
