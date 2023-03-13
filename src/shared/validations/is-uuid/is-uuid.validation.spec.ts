import { IsUUID } from '@validations';

describe('IsUUID', () => {
  test('retorna true si el valor es un UUID', () => {
    //Arrange
    const UUID = '9bdd9397-4570-4289-b35d-2fc0e901ccee';
    const expected = true;

    //Act
    const result = IsUUID(UUID);

    //Assert
    expect(result).toBe(expected);
  });

  test('retorna false si el valor no es un UUID', () => {
    //Arrange
    const UUID = '2a973294-c14e-11ed-afa1-0242ac120002';
    const expected = false;

    //Act
    const result = IsUUID(UUID);

    //Assert
    expect(result).toBe(expected);
  });
});
