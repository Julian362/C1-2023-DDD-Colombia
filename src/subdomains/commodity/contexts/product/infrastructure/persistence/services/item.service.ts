import { Injectable } from '@nestjs/common';
import { ItemPostgresService } from '../database/postgres/services/item-postgres.service';
/**
 * clase que representa el servicio de dominio de item
 *
 * @export
 * @class ItemService
 * @extends {ItemPostgresService} clase ItemPostgresService que representa el servicio de dominio de item en postgres
 */
@Injectable()
export class ItemService extends ItemPostgresService {}
