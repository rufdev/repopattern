import { Model } from 'sequelize';
import * as sequelize from 'sequelize';
import { IBaseService } from './ibase.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sq = require('./sequelizequeryparser');

export class BaseService<T extends Model> implements IBaseService<T> {
  constructor(private readonly model: any) {}

  async getoptionlist(options?: any): Promise<T[]> {
    const sequelizequery = sq(sequelize);
    const column = options.query.column;
    delete options.query.column;
    const parsedopt: any = await sequelizequery.parse(options);
    parsedopt.attributes = [
      // specify an array where the first element is the SQL function and the second is the alias
      [
        sequelize.Sequelize.fn('DISTINCT', sequelize.Sequelize.col(column)),
        column,
      ],
    ];

    return this.model.findAll(parsedopt);
  }

  async get(id: any): Promise<T> {
    return this.model.findByPk(id, { include: { all: true } });
  }

  async getall(options?: any): Promise<T[]> {
    const sequelizequery = sq(sequelize);
    const parsedopt = await sequelizequery.parse(options);
    return this.model.findAndCountAll(parsedopt);
  }

  async create(entity: any): Promise<T> {
    return this.model.create(entity, {
      include: { all: true },
    });
  }

  async update(id: any, entity: any): Promise<T> {
 
    const pk = this.model.primaryKeyAttribute;
    const where = {
      [pk]: id,
    };

    return this.model.update(entity, { where });
  }

  async delete(id: any) {
    const pk = this.model.primaryKeyAttribute;
    const where = {
      [pk]: id,
    };
    return this.model.destroy({ where });
  }

  flattenObj(obj: any, parent: any, res: any = {}) {
    for (const key in obj) {
      const propName = parent ? parent + '_' + key : key;
      if (typeof obj[key] == 'object') {
        this.flattenObj(obj[key], propName, res);
      } else {
        res[propName] = obj[key];
      }
    }
    return res;
  }
}
