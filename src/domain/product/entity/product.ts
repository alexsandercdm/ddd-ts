import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import ProductFactory from "../factory/product.factory";
import { ProductValidatorFactory } from "../factory/product.validator.factory";
import ProductInterface from "./products.interface";

export default class Product extends Entity implements ProductInterface {
    // private _id: string;
    private _name: string;
    private _price: number;

    constructor(id: string, name: string, price: number) {
        super();
        this._id = id
        this._name = name;
        this._price = price;

        this.validate();

        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors());
        }
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price;
    }

    changePrice(price: number) {
        this._price = price;
        this.validate();
    }

    changeName(name: string): void {
        this._name = name;
        this.validate();
    }


    validate(): void {
        ProductValidatorFactory.create().validade(this);
    }
}