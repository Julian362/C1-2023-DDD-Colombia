import { NameCategoryValueObject } from './name.value-object';

describe('name value object', () => {
  let objectValue: NameCategoryValueObject;
  beforeEach(() => {
    //Arrange and Act
    objectValue = new NameCategoryValueObject('name');
  });
  it('puede ser creado', () => {
    //Assert
    expect(objectValue).toBeDefined();
  });
  describe('validaciones', () => {
    it('si se le pasa un valor vació me da error', () => {
      //Arrange
      const name = '';
      const expected = false;
      //Act
      const objectValue = new NameCategoryValueObject(name);
      const result = objectValue.hasErrors();
      //Assert
      expect(result).toBe(expected);
    });

    it('si le paso un valor con más de 30 caracteres me da error', () => {
      //Arrange
      const name = 'a'.repeat(31);
      const expected = true;

      //Act
      const objectValue = new NameCategoryValueObject(name);

      const result = objectValue.hasErrors();
      //Assert
      expect(result).toBe(expected);
    });
    it('si le paso un valor con menos de 30 caracteres no me da error', () => {
      //Arrange
      const name = 'a'.repeat(29);
      const expected = false;
      //Act
      const objectValue = new NameCategoryValueObject(name);
      const result = objectValue.hasErrors();
      //Assert
      expect(result).toBe(expected);
    });
    it('si le paso un valor con menos de 3 caracteres me da error', () => {
      //Arrange
      const name = 'a'.repeat(2);
      const expected = true;
      //Act
      const objectValue = new NameCategoryValueObject(name);
      const result = objectValue.hasErrors();
      //Assert
      expect(result).toBe(expected);
    });
    it('si le paso un valor con más de 3 caracteres no me da error', () => {
      //Arrange
      const name = 'a'.repeat(4);
      const expected = false;
      //Act
      const objectValue = new NameCategoryValueObject(name);
      const result = objectValue.hasErrors();
      //Assert
      expect(result).toBe(expected);
    });
    it('si contiene alguna palabra prohibida me da error', () => {
      //Arrange
      const description = 'hola nazi';
      const expected = true;

      //Act
      const objectValue = new NameCategoryValueObject(description);
      const result = objectValue.hasErrors();

      //Assert
      expect(result).toBe(expected);
    });
    it('si no contiene ninguna palabra prohibida no me da error', () => {
      //Arrange
      const description = 'hola';
      const expected = false;

      //Act
      const objectValue = new NameCategoryValueObject(description);
      const result = objectValue.hasErrors();

      //Assert
      expect(result).toBe(expected);
    });
  });
});
