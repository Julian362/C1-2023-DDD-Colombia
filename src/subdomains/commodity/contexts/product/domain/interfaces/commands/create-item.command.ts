export interface ICreateItemUserCommand {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  state: boolean;
  seller: {
    sellerId: string;
    email: string;
    name: string;
    state: boolean;
  };
  categories: {
    categoryId: string;
    name: string;
    state: boolean;
    description: string;
  }[];
}
