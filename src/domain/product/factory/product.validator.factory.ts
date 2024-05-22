import ValidatorInterface from "../../@shared/validator/validator.interface";
import ProductInterface from "../entity/products.interface";
import ProductYupValidator from "../validator/product.yup.validator";

export class ProductValidatorFactory {
    static create(): ValidatorInterface<ProductInterface> {
        return new ProductYupValidator();
    }
}