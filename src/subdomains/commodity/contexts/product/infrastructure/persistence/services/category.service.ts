import { Injectable } from '@nestjs/common';
import { CategoryPostgresService } from '../database/postgres/services/category-postgres.service';
/**
 * clase que representa el servicio de dominio de categoría
 *
 * @export
 * @class CategoryService
 * @extends {CategoryPostgresService} clase CategoryPostgresService que representa el servicio de dominio de categoría en postgres
 */
@Injectable()
export class CategoryService extends CategoryPostgresService {}
