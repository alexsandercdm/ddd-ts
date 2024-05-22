import Notifiaction from "../notification/notifiaction"

export default abstract class Entity {
    protected _id: string
    public notification: Notifiaction;

    constructor() {
        this.notification = new Notifiaction();
    }

    get id() {
        return this._id;
    }
}