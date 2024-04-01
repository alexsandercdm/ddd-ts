import Address from "./address";

export default class Customer {
    private _id: string;
    private _name: string;
    private _address!: Address;
    private _active: boolean = true;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this.validate();
    }

    get name(): string {
        return this._name;
    }

    get id(): string {
        return this._id;
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
        if (this._name.length === 0) {
            throw new Error("Name is required");
        }

        if (this._id.length === 0) {
            throw new Error("ID is required");
        }

        // if (this._address === undefined) {
        //     throw new Error("Address is required");
        // }
    }

    changeName(name: string) {
        this._name = name;
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

