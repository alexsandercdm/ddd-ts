import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import CustomerValidatorFactory from "../factory/customer.validator.factory";
import Address from "../value-object/address";

export default class Customer extends Entity{
    private _name: string;
    private _address!: Address;
    private _active: boolean = true;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        super();
        this._id = id;
        this._name = name;
        this.validate();

        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors());
        }
    }

    get name(): string {
        return this._name;
    }

    set Address(address: Address) {
        this._address = address;
    }

    get address(): Address {
        return this._address;
    }

    get rewardPoint(): number {
        return this._rewardPoints;
    }

    isActivate(): boolean {
        return this._active;
    }

    validate() {
        CustomerValidatorFactory.create().validade(this);
    }

    changeName(name: string) {
        this._name = name;
    }

    changeAddress(address: Address) {
        this._address = address;
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }

    activate() {

        if (this._address === undefined) {
            throw new Error("Address is mandatory to activate a customer");
        }

        this._active = true;
    }

    deactivate() {
        this._active = false;
    }
}

