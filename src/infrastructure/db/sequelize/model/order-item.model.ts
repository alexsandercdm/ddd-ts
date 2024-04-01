import {Table, Model, PrimaryKey, Column, ForeignKey, BelongsTo} from 'sequelize-typescript';
import ProdudctModel from './product.model';
import OrderModel from './order.model';

@Table({
    tableName: "order_items",
    timestamps: false,
})
export default class OrderItemModel extends Model {
    @PrimaryKey
    @Column
    declare id: string;

    @ForeignKey(() => ProdudctModel)
    @Column({ allowNull: false })
    declare product_id: string;

    @BelongsTo(() => ProdudctModel)
    declare product: ProdudctModel;

    @ForeignKey(() => OrderModel)
    @Column({ allowNull: false })
    declare order_id: string;

    @BelongsTo(() => OrderModel)
    declare order: OrderModel;

    @Column({ allowNull: false })
    declare quantity: number;

    @Column({ allowNull: false })
    declare name: string

    @Column({ allowNull: false })
    declare price: number;
}