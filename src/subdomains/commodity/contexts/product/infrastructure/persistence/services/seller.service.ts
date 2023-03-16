import { Injectable } from '@nestjs/common';
import { SellerPostgresService } from '../database/postgres/services/seller-postgres.service';
/**
 * clase que representa el servicio de dominio de vendedor
 *
 * @export
 * @class SellerService
 * @extends {SellerPostgresService} clase SellerPostgresService que representa el servicio de dominio de vendedor en postgres
 */
@Injectable()
export class SellerService extends SellerPostgresService {}
