import { DataTypes } from 'sequelize';
import { Column} from 'sequelize-typescript';


export class BaseEntity {
    @Column({ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },)
    id: any;
}