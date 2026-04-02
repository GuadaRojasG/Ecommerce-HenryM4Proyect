import { getAllProducts } from "@/services/productService"
import Card from "./Card"
import Link from "next/link"

const CardList = async () => {
	const productsToPreLoad = await getAllProducts()
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
			{
				productsToPreLoad.map( (product) => {
					return (
						<Link href={`/product/${product.id}`} key={product.id}>
							<Card key={product.id} {...product}/>
						</Link>
					)
				})
			}
		</div>
	)
}

export default CardList