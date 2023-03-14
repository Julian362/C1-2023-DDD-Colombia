import { EmailValueObject } from './email.value-object';

describe('email value object', () => {
  let objectValue: EmailValueObject;
  beforeEach(() => {
    //Arrange and Act
    objectValue = new EmailValueObject('julianga@gmail.com');
  });
  it('puede ser creado', () => {
    //Assert
    expect(objectValue).toBeDefined();
  });
  describe('validaciones', () => {
    it('si le paso un email valido no me da error', () => {
      //Arrange
      const email = 'julianga351@hotmail.com';
      const expected = false;
      //Act
      const objectValue = new EmailValueObject(email);
      const result = objectValue.hasErrors();
      //Assert
      expect(result).toBe(expected);
    });
    it('si le paso un email no valido me da error', () => {
      //Arrange
      const email = 'julianga';
      const expected = true;
      //Act
      const objectValue = new EmailValueObject(email);
      const result = objectValue.hasErrors();
      //Assert
      expect(result).toBe(expected);
    });
    it('si le paso un email superando los 100 caracteres me da error', () => {
      //Arrange
      const email = 'a'.repeat(100) + 'gmail.com';
      const expected = true;
      //Act
      const objectValue = new EmailValueObject(email);
      const result = objectValue.hasErrors();
      //Assert
      expect(result).toBe(expected);
    });
    it('si le paso un email vacio me da error', () => {
      //Arrange
      const email = ' ';
      const expected = true;
      //Act
      const objectValue = new EmailValueObject(email);
      const result = objectValue.hasErrors();
      //Assert
      expect(result).toBe(expected);
    });
    it('si le paso un email con palabras prohibidas me da error', () => {
      //Arrange
      const email = 'nazi@gmail.com';
      const expected = true;
      //Act
      const objectValue = new EmailValueObject(email);
      const result = objectValue.hasErrors();
      //Assert
      expect(result).toBe(expected);
    });
  });
});
