import { PriceValueObject } from './price.value-object';

describe('price value object', () => {
  let objectValue: PriceValueObject;
  beforeEach(() => {
    //Arrange and Act
    objectValue = new PriceValueObject(1000);
  });
  it('puede ser creado', () => {
    //Assert
    expect(objectValue).toBeDefined();
  });

  describe('validaciones', () => {
    it('si le paso un precio valido no me da error', () => {
      //Arrange
      const price = 1000;
      const expected = false;
      //Act
      const objectValue = new PriceValueObject(price);
      const result = objectValue.hasErrors();
      //Assert
      expect(result).toBe(expected);
    });
    it('si le paso un precio no valido me da error', () => {
      //Arrange
      const price = -1000;
      const expected = true;
      //Act
      const objectValue = new PriceValueObject(price);
      const result = objectValue.hasErrors();
      //Assert
      expect(result).toBe(expected);
    });
  });
});
