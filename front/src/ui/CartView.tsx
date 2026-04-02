"use client";

import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Swal from "sweetalert2";

const CartView = () => {
  const { cart, deleteProductFromCart, emptyCart, userData, isAuthLoading } = useAuth();
  const router = useRouter();

  const subtotal = cart.reduce((total, product) => total + product.price, 0);
  const shipping = subtotal > 0 ? 10 : 0;
  const total = subtotal + shipping;

  const requestOrder = async () => {
    if (!process.env.NEXT_PUBLIC_API_URL) {
      throw Error("Service not set");
    }
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/orders`,
      {
        products: cart.map((product) => product.id),
      },
      {
        headers: {
          authorization: userData?.token,
        },
      },
    );
  };

  const handleCheckout = async () => {
    try {
      if (cart.length) {
        await requestOrder();
        emptyCart();
        await Swal.fire({
          icon: "success",
          title: "Compra realizada",
          text: "Tu pedido se procesó con éxito",
          confirmButtonText: "Ir al perfil",
          confirmButtonColor: "#000",
        });
        router.push("/profile");
      } else {
        Swal.fire({
          icon: "warning",
          title: "Carrito vacío",
          text: "No hay productos para comprar",
          confirmButtonColor: "#000",
        });
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Ocurrió un problema",
        confirmButtonColor: "#000",
      });
    }
  };

  useEffect(() => {
    const proteccion = async () => {
      if (!userData?.token && !isAuthLoading) {
        router.push("/login");
        await Swal.fire({
          icon: "info",
          text: "Debes iniciar sesion",
          confirmButtonText: "Ir al login",
          confirmButtonColor: "#000",
        });
      }
    };
    proteccion();
  }, [userData, isAuthLoading, router]);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 m-5 rounded-l">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl mb-8">CARRITO</h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-500 text-xl mb-6">Tu carrito está vacío</p>
            <button
              onClick={() => router.push("/")}
              className="bg-black text-white py-2 px-10 rounded-full mt-2 transition-colors hover:bg-white border-black border-1 hover:text-black"
            >
              CONTINUAR COMPRANDO
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="rounded-lg shadow px-6 pt-6 space-y-6 bg-white">
                {cart.map((product) => (
                  <div
                    key={product.id}
                    className="flex gap-4 border-gray-400 border-b pb-6 last:border-b-0"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-25 h-30 object-cover rounded-lg bg-[#e2e7f1]"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg mb-2">{product.name}</h3>
                      <p className="text-sm">${product.price}</p>
                    </div>
                    <button
                      onClick={() => deleteProductFromCart(product.id)}
                      className="h-fit text-gray-500 cursor-pointer"
                    >
                      ELIMINAR
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={emptyCart}
                className="mt-6 w-full bg-black text-white py-2 px-10 rounded-full mt-2 transition-colors hover:bg-white border-black border hover:text-black"
              >
                VACIAR
              </button>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-20">
                <h2 className="text-2xl mb-6">RESUMEN DEL PEDIDO</h2>

                <div className="space-y-4 mb-6 pb-6 border-gray-400 border-b">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Subtotal ({cart.length} items)
                    </span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Envío</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between mb-6 text-lg">
                  <span>Total</span>
                  <span className="text-2xl">${total.toFixed(2)}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-black text-white py-2 px-10 rounded-full mt-2 transition-colors hover:bg-white border-black border hover:text-black"
                >
                  PAGAR
                </button>
                <button
                  onClick={() => router.push("/products")}
                  className="w-full px-6 py-3 rounded-lg cursor-pointer text-s text-gray-500"
                >
                  CONTINUAR COMPRA
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartView;
