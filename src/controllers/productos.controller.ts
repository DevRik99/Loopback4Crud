import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Productos} from '../models';
import {ProductosRepository} from '../repositories';

export class ProductosController {
  constructor(
    @repository(ProductosRepository)
    public productosRepository : ProductosRepository,
  ) {}

  @post('/productos', {
    responses: {
      '200': {
        description: 'Productos model instance',
        content: {'application/json': {schema: getModelSchemaRef(Productos)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Productos, {
            title: 'NewProductos',
            exclude: ['id'],
          }),
        },
      },
    })
    productos: Omit<Productos, 'id'>,
  ): Promise<Productos> {
    return this.productosRepository.create(productos);
  }

  @get('/productos/count', {
    responses: {
      '200': {
        description: 'Productos model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Productos) where?: Where<Productos>,
  ): Promise<Count> {
    return this.productosRepository.count(where);
  }

  @get('/productos', {
    responses: {
      '200': {
        description: 'Array of Productos model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Productos, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Productos) filter?: Filter<Productos>,
  ): Promise<Productos[]> {
    return this.productosRepository.find(filter);
  }

  @patch('/productos', {
    responses: {
      '200': {
        description: 'Productos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Productos, {partial: true}),
        },
      },
    })
    productos: Productos,
    @param.where(Productos) where?: Where<Productos>,
  ): Promise<Count> {
    return this.productosRepository.updateAll(productos, where);
  }

  @get('/productos/{id}', {
    responses: {
      '200': {
        description: 'Productos model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Productos, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Productos, {exclude: 'where'}) filter?: FilterExcludingWhere<Productos>
  ): Promise<Productos> {
    return this.productosRepository.findById(id, filter);
  }

  @patch('/productos/{id}', {
    responses: {
      '204': {
        description: 'Productos PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Productos, {partial: true}),
        },
      },
    })
    productos: Productos,
  ): Promise<void> {
    await this.productosRepository.updateById(id, productos);
  }

  @put('/productos/{id}', {
    responses: {
      '204': {
        description: 'Productos PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() productos: Productos,
  ): Promise<void> {
    await this.productosRepository.replaceById(id, productos);
  }

  @del('/productos/{id}', {
    responses: {
      '204': {
        description: 'Productos DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.productosRepository.deleteById(id);
  }
}
