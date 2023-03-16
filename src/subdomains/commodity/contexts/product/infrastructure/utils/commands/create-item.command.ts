import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { ICreateItemCommand } from '../../../domain/interfaces/commands/create-item.command';
/**
 * clase Seller que representa el vendedor
 *
 * @class Seller
 */
class Seller {
  @IsString({ message: 'el id del vendedor debe ser un string' })
  sellerId: string;

  @IsString({ message: 'el email del vendedor debe ser un string' })
  email: string;

  @IsString({ message: 'el nombre del vendedor debe ser un string' })
  name: string;

  @IsBoolean({ message: 'el estado del vendedor debe ser un boolean' })
  state: boolean;
}

/**
 * clase Categories que representa las categorías
 *
 * @class Categories
 */
class Categories {
  @IsString({ message: 'el id de la categoría debe ser un string' })
  categoryId: string;

  @IsString({ message: 'el nombre de la categoría debe ser un string' })
  name: string;

  @IsBoolean({ message: 'el estado de la categoría debe ser un boolean' })
  state: boolean;

  @IsString({ message: 'la descripción de la categoría debe ser un string' })
  description: string;
}

/**
 * clase CreateItemCommand que representa el comando para crear un item
 *
 * @export
 * @class CreateItemCommand
 * @implements {ICreateItemCommand}
 */
export class CreateItemCommand implements ICreateItemCommand {
  @IsString({ message: 'el id del item debe ser un string' })
  itemId: string;

  @IsString({ message: 'el nombre del item debe ser un string' })
  name: string;

  @IsString({ message: 'la descripción del item debe ser un string' })
  description: string;

  @IsNumber({}, { message: 'el precio del item debe ser un numero' })
  price: number;

  @IsString({ message: 'la imagen del item debe ser un string' })
  image: string;

  @IsBoolean({ message: 'el estado del item debe ser un boolean' })
  state: boolean;

  seller: Seller;

  categories: Categories[];
}
