import { SellerIdValueObject } from './seller-id.value-object';

describe('id del vendedor value object', () => {
  let objectValue: SellerIdValueObject;
  beforeEach(() => {
    //Arrange and Act
    objectValue = new SellerIdValueObject();
  });
  it('puede ser creado', () => {
    //Assert
    expect(objectValue).toBeDefined();
  });
  describe('validaciones', () => {
    it('si no se le pasa un valor vació me crea el uuid y no me da error', () => {
      //Arrange
      const UUID = '';
      const expected = false;
      //Act
      const objectValue = new SellerIdValueObject(UUID);
      const result = objectValue.hasErrors();
      //Assert
      expect(result).toBe(expected);
    });

    it('si le paso un uuid no valido o con una versión diferente me da error', () => {
      //Arrange
      const UUID_v1 = '13b6594c-c1c1-11ed-afa1-0242ac120002';
      const expected = true;
      //Act
      const objectValue = new SellerIdValueObject(UUID_v1);
      const result = objectValue.hasErrors();
      //Assert
      expect(result).toBe(expected);
    });

    it('si le paso un uuid valido no me da error', () => {
      //Arrange
      const UUID = '2e845f8a-1072-417b-b72f-1a1f8bcc48af';
      const expected = false;
      //Act
      const objectValue = new SellerIdValueObject(UUID);
      const result = objectValue.hasErrors();
      //Assert
      expect(result).toBe(expected);
    });
  });
});
