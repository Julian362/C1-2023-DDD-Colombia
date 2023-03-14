import { DescriptionValueObject } from './description.value-object';

describe('descripción de el item value object', () => {
  let objectValue: DescriptionValueObject;
  beforeEach(() => {
    //Arrange and Act
    objectValue = new DescriptionValueObject('description');
  });
  it('puede ser creado', () => {
    //Assert
    expect(objectValue).toBeDefined();
  });
  describe('validaciones', () => {
    it('si se le pasa un valor vació me da error', () => {
      //Arrange
      const description = '';
      const expected = false;
      //Act
      const objectValue = new DescriptionValueObject(description);
      const result = objectValue.hasErrors();
      //Assert
      expect(result).toBe(expected);
    });
    it('si le paso un valor con más de 300 caracteres me da error', () => {
      //Arrange
      const description = 'a'.repeat(301);
      const expected = true;

      //Act
      const objectValue = new DescriptionValueObject(description);

      const result = objectValue.hasErrors();
      //Assert
      expect(result).toBe(expected);
    });
    it('si le paso un valor con menos de 300 caracteres no me da error', () => {
      //Arrange
      const description = 'a'.repeat(299);
      const expected = false;
      //Act
      const objectValue = new DescriptionValueObject(description);
      const result = objectValue.hasErrors();
      //Assert
      expect(result).toBe(expected);
    });
    it('si contiene alguna palabra prohibida me da error', () => {
      //Arrange
      const description = 'hola nazi';
      const expected = true;
      //Act
      const objectValue = new DescriptionValueObject(description);
      const result = objectValue.hasErrors();
      //Assert
      expect(result).toBe(expected);
    });
    it('si no contiene ninguna palabra prohibida no me da error', () => {
      //Arrange
      const description = 'hola';
      const expected = false;
      //Act
      const objectValue = new DescriptionValueObject(description);
      const result = objectValue.hasErrors();
      //Assert
      expect(result).toBe(expected);
    });
  });
});
