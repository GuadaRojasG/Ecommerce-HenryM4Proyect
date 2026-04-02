import { getProductById } from "@/services/productService";
import { IProductDetail } from "@/types/propTypes";
import ProductDetailView from "@/ui/ProductDetailView";


const DetailPage: React.FC<IProductDetail> = async ({params}) => {
    const {productId} = await params
    const productDetail = await getProductById(productId)
    
    return (
        <ProductDetailView {...productDetail} />
    )
}

export default DetailPage;