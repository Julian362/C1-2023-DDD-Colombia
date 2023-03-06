import { ValueObjectBase } from '../../../../../../../../shared/sofka/bases/object-value.base';
export class EmailValueObject extends ValueObjectBase<string> {
  constructor(value: string) {
    super(value);
  }
  validateData(): void {
    throw new Error('Method not implemented.');
  }

  private 
}
