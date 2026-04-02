'use client'
import { useAuth } from "@/context/AuthContext"
import { IProduct } from "@/types/types"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"

const ProductDetailView: React.FC<IProduct> = ( {id, name, image, description, stock, price, categoryId}) => {
    const router = useRouter()
    const {userData, addProductToCart, checkCart, deleteProductFromCart} = useAuth()

    const handleCheckout = async () => {
        if(userData?.token) {
            addProductToCart({id, name, image, description, stock, price, categoryId})
            await Swal.fire({
                toast: true,
                position: "top-end",
                icon: "success",
                title: "Producto agregado al carrito",
                showConfirmButton: false,
                timer: 1800,
                timerProgressBar: true
            });
        } else {
            const result = await Swal.fire({
                icon: "warning",
                title: "Inicia sesión",
                text: "Debes iniciar sesión para comprar",
                confirmButtonText: "Ir al login",
                showCancelButton: true,
                confirmButtonColor: '#000',
                cancelButtonText: "Cancelar",
            });
            if (result.isConfirmed) {
                router.push("/login");
            }
        }
    }

    const handleRemoveFromCart = () => {
        deleteProductFromCart(id)
        Swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: "Producto eliminado del carrito",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true
        });
    }
    
    return (
        <div className="flex flex-col md:flex-row bg-white m-5 rounded-xl">
            <Link href="/products" className="flex items-start m-5 text-black">
                ←
            </Link>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt={`Imagen del producto ${name}`} className="w-175 md:w-160 bg-[#e2e7f1] m-3 rounded-xl" />
            <div className="flex flex-col justify-center items-center justify-self-center px-6 pt-4 sm:px-10 md:px-20 gap-5">
                <h1 className="text-xl sm:text-2xl">{name}</h1>
                <p className="px-2 sm:px-10 md:px-20 text-center md:text-left">{description}</p>
                <p>Disponibles: {stock} unidades</p>
                <p className="text-lg sm:text-xl">${price}</p>
                <button onClick={checkCart(id) ? handleRemoveFromCart : handleCheckout} className="bg-black text-white font-bold px-6 sm:px-16 md:px-50 py-3 sm:py-4 mb-6 rounded-full text-sm sm:text-l hover:bg-white border-black border hover:text-black w-full sm:w-auto"
        >{checkCart(id) ? 'REMOVER DEL CARRITO' : 'AGREGAR AL CARRITO'}</button>
            </div>
        </div>
    )
}

export default ProductDetailView