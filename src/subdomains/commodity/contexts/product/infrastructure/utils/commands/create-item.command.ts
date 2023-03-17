import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString, ValidateNested } from 'class-validator';
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
  @ApiProperty()
  categoryId: string;

  @IsString({ message: 'el nombre de la categoría debe ser un string' })
  @ApiProperty()
  name: string;

  @IsBoolean({ message: 'el estado de la categoría debe ser un boolean' })
  @ApiProperty()
  state: boolean;

  @IsString({ message: 'la descripción de la categoría debe ser un string' })
  @ApiProperty()
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
  @ApiProperty()
  itemId: string;

  @IsString({ message: 'el nombre del item debe ser un string' })
  @ApiProperty()
  name: string;

  @IsString({ message: 'la descripción del item debe ser un string' })
  @ApiProperty()
  description: string;

  @IsNumber({}, { message: 'el precio del item debe ser un numero' })
  @ApiProperty()
  price: number;

  @IsString({ message: 'la imagen del item debe ser un string' })
  @ApiProperty()
  image: string;

  @IsBoolean({ message: 'el estado del item debe ser un boolean' })
  @ApiProperty()
  state: boolean;

  @ValidateNested()
  @ApiProperty()
  seller: Seller;

  @ValidateNested()
  @ApiProperty()
  categories: Categories[];
}
