export default class Address{

    private _street: string = "";
    private _number: number = 0;
    private _zip: string = "";
    private _city: string = "";

    constructor(street: string, number: number, zip: string, city: string) {
        this._street = street;
        this._city = city;
        this._number = number;
        this._zip = zip;

        this.validade();
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
        if (this._street.length === 0){
            throw new Error("Street is required")
        }
        if (this._city.length === 0){
            throw new Error("City is required")
        }
        if (this._number === 0){
            throw new Error("number is required")
        }
        if (this._zip.length === 0){
            throw new Error("Zip Code is required")
        }
    }
}