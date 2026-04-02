'use client'
import { IProduct, IUserSession } from "@/types/types"
import { useRouter } from "next/navigation"
import { createContext, useContext, useState, useEffect } from "react"
import Swal from "sweetalert2"

export interface IAuthContext {
	userData: IUserSession | null;
	setUserData: (values: IUserSession | null) => void;
	handleLogout: () => void,
	cart: IProduct[],
	checkCart: (productId: number) => boolean,
	addProductToCart: (product: IProduct) => void,
	deleteProductFromCart: (productId: number) => void,
	emptyCart: () => void,
	isAuthLoading: boolean
}

export const AuthContext = createContext<IAuthContext>({
	userData: null,
	setUserData: () => {},
	handleLogout: () => {},
	cart: [],
	checkCart: () => false,
	addProductToCart: () => {},
	deleteProductFromCart: () => {},
	emptyCart: () => {},
	isAuthLoading: true
})

export interface IAuthProvider {
	children: React.ReactNode
}

export const AuthProvider: React.FC<IAuthProvider> = ({children}) => {

	const [userData, setUserData] = useState<IUserSession | null>(null)
	const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true)
	const router = useRouter()

	const handleLogout = () => {
		localStorage.removeItem("userSession")
		setUserData(null)
		Swal.fire({
			icon: "success",
			title: "Sesión cerrada",
			text: "Has cerrado sesión correctamente",
			confirmButtonText: "OK",
			confirmButtonColor: "black"
		});
		router.push('/')
		emptyCart()
	}

	useEffect(() => {
		if(userData) {
			localStorage.setItem('userSession', JSON.stringify({token: userData.token, user: userData.user}))
		}
	}, [userData])

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setIsAuthLoading(true)
		const userData = JSON.parse(localStorage.getItem('userSession')!)
		setUserData(userData)
		setIsAuthLoading(false)
	}, [])

	const [cart, setCart] = useState<IProduct[]>([])

	const checkCart = (productId: number) => {
		const found = cart.find( (product) => product.id == productId)
		return !!found
	}

	const addProductToCart = (product: IProduct) => {
		if (!checkCart(product.id)) {
			setCart([...cart, product])
		}
	}

	const deleteProductFromCart = (productId: number) => {
		if (checkCart(productId)) {
			setCart(cart.filter((product) => product.id != productId))
		}
	}

	const emptyCart = () => setCart([])

	return (
		<AuthContext.Provider value={{
			userData,
			setUserData,
			handleLogout,
			checkCart,
			addProductToCart,
			deleteProductFromCart,
			emptyCart,
			cart,
			isAuthLoading
		}}>{children}</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext)