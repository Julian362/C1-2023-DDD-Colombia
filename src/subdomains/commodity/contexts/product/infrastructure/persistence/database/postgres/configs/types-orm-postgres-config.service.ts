import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { ItemPostgresEntity } from '../entities/item-postgres.entity';
import { SellerPostgresEntity } from '../entities/seller-postgres.entity';
import { CategoryPostgresEntity } from '../entities/category-postgres.entity';

/**
 * clase TypesOrmPostgresConfigService que implementa la interfaz TypeOrmOptionsFactory
 *
 * @export
 * @class TypesOrmPostgresConfigService
 * @implements {TypeOrmOptionsFactory}
 */
@Injectable()
export class TypesOrmPostgresConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  /**
   * método createTypeOrmOptions que retorna un objeto de tipo TypeOrmModuleOptions
   *
   * @return {TypeOrmModuleOptions} objeto de tipo TypeOrmModuleOptions
   * @memberof TypesOrmPostgresConfigService
   */
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USER'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_NAME'),
      entities: [
        ItemPostgresEntity,
        SellerPostgresEntity,
        CategoryPostgresEntity,
      ],
      synchronize: true,
      logging: true,
    };
  }
}
