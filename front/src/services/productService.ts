import { IProduct } from "@/types/types"

const APIURL = process.env.NEXT_PUBLIC_API_URL

export async function getAllProducts(): Promise<IProduct[]> {
    try {
        const response = await fetch(`${APIURL}/products`, {
            cache: 'no-cache'
        })
        const products: IProduct[] = await response.json()
        return products
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        throw new Error(error)
    }
}

export async function getProductById( id: string ): Promise<IProduct> {
    try {
        const response = await getAllProducts()
        const productFiltered = response.find((product) => product.id.toString() === id )
        if(!productFiltered) {
            throw new Error(`Producto con id ${id} no encontrado`)
        }
        return productFiltered
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        throw new Error(error)
    }
}