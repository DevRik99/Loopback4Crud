import {DefaultCrudRepository} from '@loopback/repository';
import {Productos, ProductosRelations} from '../models';
import {MySqlDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ProductosRepository extends DefaultCrudRepository<
  Productos,
  typeof Productos.prototype.id,
  ProductosRelations
> {
  constructor(
    @inject('datasources.MySql') dataSource: MySqlDataSource,
  ) {
    super(Productos, dataSource);
  }
}
