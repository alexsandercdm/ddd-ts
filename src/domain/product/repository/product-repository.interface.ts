import RepositoryInterface from "../../@shared/repository/repository-interface";
import ProductInterface from "../entity/products.interface";

export default interface ProductRepositoryInterface 
    extends RepositoryInterface<ProductInterface> {}