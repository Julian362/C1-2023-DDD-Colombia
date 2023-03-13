import { ContainForbiddenWords } from './forbidden-words.validation';
describe('ForbiddenWords', () => {
  test('retorna false si el valor no contiene palabras prohibidas', () => {
    //Arrange
    const value = 'Hola mundo';
    const expected = false;

    //Act
    const result = ContainForbiddenWords(value);

    //Assert
    expect(result).toBe(expected);
  });

  test('retorna true si el valor contiene palabras prohibidas', () => {
    //Arrange
    const value = 'Hola mundo, sexo';
    const expected = true;

    //Act
    const result = ContainForbiddenWords(value);

    //Assert
    expect(result).toBe(expected);
  });

  test('retorna true si el valor contiene palabras prohibidas en mayúsculas', () => {
    //Arrange
    const value = 'Hola mundo, NAZI';
    const expected = true;

    //Act
    const result = ContainForbiddenWords(value);

    //Assert
    expect(result).toBe(expected);
  });
});
