import { v4 as uuidv4 } from 'uuid';
import { CategoryDomainEntity } from './category.domain-entity';
import { ItemDomainEntity } from './item.domain-entity';
import { SellerDomainEntity } from './seller.domain-entity';
describe('entities', () => {
  describe('Item', () => {
    const itemId = uuidv4();
    const name = 'Item Name';
    const description = 'Item Description';
    const price = 100;
    const seller = {} as SellerDomainEntity;
    const categories = {} as CategoryDomainEntity[];
    it('debe crear un item', () => {
      const item = new ItemDomainEntity({
        itemId,
        name,
        description,
        price,
        seller,
        categories,
      });
      expect(item).toBeDefined();
    });
  });
  describe('Category', () => {
    const categoryId = uuidv4();
    const name = 'Category Name';
    const description = 'Category Description';
    it('debe crear una categoria', () => {
      const category = new CategoryDomainEntity({
        categoryId,
        name,
        description,
      });
      expect(category).toBeDefined();
    });
  });
  describe('Seller', () => {
    const sellerId = uuidv4();
    const name = 'Seller Name';
    const email = 'julianga352@gmail.com';
    it('debe crear un vendedor', () => {
      const seller = new SellerDomainEntity({
        sellerId,
        name,
        email,
      });
      expect(seller).toBeDefined();
    });
  });
});
