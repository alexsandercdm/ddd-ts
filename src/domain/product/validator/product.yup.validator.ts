import ValidatorInterface from "../../@shared/validator/validator.interface";
import ProductInterface from "../entity/products.interface";
import * as yup from "yup";

export default class ProductYupValidator implements ValidatorInterface<ProductInterface> {
    validade(entity: ProductInterface): void {
        try {
            yup
                .object()
                .shape(
                    {
                        id: yup.string().required("Id is required"),
                        name: yup.string().required("Name is required"),
                        price: yup.number().moreThan(0, "Price must be greater thean zero"),
                    }
                )
                .validateSync(
                    {
                        id: entity.id,
                        name: entity.name,
                        price: entity.price,
                    }, {
                    abortEarly: false,
                }
                )
        } catch (errors) {
            const e = errors as yup.ValidationError;
            e.errors.forEach(error => {
                entity.notification.addError({
                    context: "product",
                    message: error,
                });
            });
        }
    }

}