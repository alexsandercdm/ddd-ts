import Entity from "../../@shared/entity/entity.abstract";
import ProductInterface from "./products.interface";

export default class ProductB extends Entity implements ProductInterface{
    // private _id: string;
    private _name: string;
    private _price: number;

    constructor(id: string, name: string, price: number) {
        super();
        this._id = id
        this._name = name;
        this._price = price;

        this.validate();
    }

    get id(): string {
        return this._id;
    }

    get name():string {
        return this._name;
    }

    get price():number{
        return this._price * 2;
    }

    changePrice(price: number){
        this._price = price;
        this.validate();
    }

    changeName(name: string): void {
        this._name = name;
        this.validate();
    }


    validate(): boolean{
        
        if (this._id.length === 0){
            this.notification.addError({
                context: "productB",
                message: "Id is required",
            });
        }
        
        if (this._name.length === 0){
            this.notification.addError({
                context: "productB",
                message: "Name is required",
            });
        }

        if (this._price <= 0){
            this.notification.addError({
                context: "productB",
                message: "Price must be greater thean zero",
            });
        }
        
        return true;
    }
}