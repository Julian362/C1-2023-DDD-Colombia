import { ImageValueObject } from './image.value-object';

describe('image value object', () => {
  let objectValue: ImageValueObject;
  beforeEach(() => {
    //Arrange and Act
    objectValue = new ImageValueObject('/image.jpg');
  });
  it('puede ser creado', () => {
    //Assert
    expect(objectValue).toBeDefined();
  });

  describe('validaciones', () => {
    it('si le paso una url valida no me da error', () => {
      //Arrange
      const image = './image.jpg';
      const expected = false;
      //Act
      const objectValue = new ImageValueObject(image);
      const result = objectValue.hasErrors();
      //Assert
      expect(result).toBe(expected);
    });
    it('si le paso una url no valida me da error', () => {
      //Arrange
      const image = 'image';
      const expected = true;
      //Act
      const objectValue = new ImageValueObject(image);
      const result = objectValue.hasErrors();
      //Assert
      expect(result).toBe(expected);
    });
    it('si le paso una url superando los 255 caracteres me da error', () => {
      //Arrange
      const image = './a'.repeat(100) + '/image.jpg';
      const expected = true;
      //Act
      const objectValue = new ImageValueObject(image);
      const result = objectValue.hasErrors();
      //Assert
      expect(result).toBe(expected);
    });
    it('si le paso una url vacia me da error', () => {
      //Arrange
      const image = ' ';
      const expected = true;
      //Act
      const objectValue = new ImageValueObject(image);
      const result = objectValue.hasErrors();
      //Assert
      expect(result).toBe(expected);
    });
  });
});
