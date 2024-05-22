export default interface ValidatorInterface<T> {
    validade(entity: T): void;
}