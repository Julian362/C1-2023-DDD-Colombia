import { StateSellerValueObject } from './state.value-object';

describe('state value object', () => {
  let objectValue: StateSellerValueObject;
  beforeEach(() => {
    //Arrange and Act
    objectValue = new StateSellerValueObject(true);
  });
  it('puede ser creado', () => {
    //Assert
    expect(objectValue).toBeDefined();
  });
  describe('validaciones', () => {
    it('si le paso un booleano no me da error', () => {
      //Arrange
      const state = true;
      const expected = false;
      //Act
      const objectValue = new StateSellerValueObject(state);
      const result = objectValue.hasErrors();
      //Assert
      expect(result).toBe(expected);
    });
    it('retorna el field con el nombre del campo', () => {
      //Arrange
      const expected = 'state';
      //Act
      const result = objectValue.getFieldName();
      //Assert
      expect(result).toBe(expected);
    });
  });
});
