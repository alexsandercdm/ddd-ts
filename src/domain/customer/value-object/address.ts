import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import AddressValidatorFactory from "../factory/address.validator.factory";

export default class Address extends Entity{

    private _street: string = "";
    private _number: number = 0;
    private _zip: string = "";
    private _city: string = "";

    constructor(street: string, number: number, zip: string, city: string) {
        super();
        this._street = street;
        this._city = city;
        this._number = number;
        this._zip = zip;

        this.validade();

        if (this.notification.hasErrors()){
            throw new NotificationError(this.notification.getErrors());
        }
    }

    get street(): string {
        return this._street;
    }
    get number(): number {
        return this._number;
    }
    get zip(): string {
        return this._zip;
    }
    get city(): string {
        return this._city;
    }

    validade(){
        AddressValidatorFactory.create().validade(this);
    }
}