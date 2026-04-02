'use client'
import { useAuth } from "@/context/AuthContext";
import { IOrder } from "@/types/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProfileView = () => {
    const {userData, isAuthLoading, handleLogout} = useAuth()
    const router = useRouter()
    const [orders, setOrders] = useState<IOrder[]>([])
    const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null)

    useEffect(() => {
        if (!userData?.token && !isAuthLoading) {
            router.push('/login')
        }
    }, [userData, router, isAuthLoading])

    useEffect(() => {
        if (!process.env.NEXT_PUBLIC_API_URL) {
            throw Error('Service not set')
        }
        if(!userData?.token) return
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/orders`, {
            headers: {
                authorization: userData?.token
            }
        })
        .then((res) => {
            setOrders(res.data)
        })
    }, [userData?.token])

    return (
<div className="bg-[#e2e7f1] rounded-l text-black p-5">
  <div className="flex gap-4 min-h-[750px]">

    <div className="bg-white rounded-lg p-10 min-w-1/4 shadow">
      <h2 className="text-2xl mb-6">PERFIL</h2>

      <div className="space-y-4">
        <div>
          <p className="text-gray-600 text-sm">nombre</p>
          <p>{userData?.user?.name}</p>
        </div>

        <div>
          <p className="text-gray-600 text-sm">email</p>
          <p className="break-all">{userData?.user?.email}</p>
        </div>

        <div>
          <p className="text-gray-600 text-sm">telefono</p>
          <p>{userData?.user?.phone || "No registrado"}</p>
        </div>

        <div>
          <p className="text-gray-600 text-sm">direccion</p>
          <p>{userData?.user?.address || "No registrado"}</p>
        </div>

        <div className="flex justify-center pt-4">
          <button
            onClick={handleLogout}
            className="bg-black text-white font-bold py-2 px-10 rounded-full border border-black transition hover:bg-white hover:text-black"
          >
            CERRAR SESION
          </button>
        </div>
      </div>
    </div>

    <div className="bg-white rounded-lg shadow p-10 w-3/4">
      <h2 className="text-2xl mb-6">ORDENES</h2>

      {orders.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg mb-4">No tienes órdenes aún</p>
          <button
            onClick={() => router.push('/')}
            className="bg-black text-white font-bold py-2 px-10 rounded-full border border-black transition hover:bg-white hover:text-black"
          >
            VER PRODUCTOS
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div
              key={order.id}
              onClick={() => setSelectedOrder(order)}
              className="border border-gray-200 rounded-lg p-4 cursor-pointer transition hover:shadow-md hover:bg-gray-50"
            >
              <div className="flex justify-between mb-2 flex-wrap gap-2">
                <div>
                  <p className="font-semibold text-lg">#{order.id}</p>
                  <p className="text-gray-600 text-sm">
                    {new Date(order.date).toLocaleDateString('es-AR')}
                  </p>
                </div>

                <span className="px-3 py-1 self-center rounded-full text-sm font-semibold bg-[#e2e7f1] text-gray-500 whitespace-nowrap">
                  {order.status}
                </span>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-600">
                  {order.products?.length || 0} productos
                </p>
                <p className="text-lg">
                  ${order.products?.reduce((sum, p) => sum + p.price, 0)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>

          {selectedOrder && (
            <div className="fixed inset-0 bg-[#e2e7f1]/50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg max-w-2xl w-full overflow-y-auto shadow">
        
                <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
                  <h3 className="text-2xl font-semibold">#{selectedOrder.id}</h3>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ✕
                  </button>
                </div>
        
                <div className="p-6 space-y-4">
                  <div>
                    <p className="text-gray-600 text-sm">fecha</p>
                    <p className="font-semibold">
                      {new Date(selectedOrder.date).toLocaleDateString('es-AR')}
                    </p>
                  </div>
        
                  {selectedOrder.products?.map((product, idx) => (
                    <div key={idx} className="flex justify-between">
                      <div>
                        <p>{product.name || 'Producto'}</p>
                        <p className="text-gray-600 text-sm">cantidad: 1</p>
                      </div>
                      <p>${product.price}</p>
                    </div>
                  ))}

                  <div className="border-t pt-4 flex justify-between text-lg font-bold">
                    <p>TOTAL</p>
                    <p>
                      ${selectedOrder.products?.reduce((sum, p) => sum + p.price, 0)}
                    </p>
                  </div>
                </div>
              
              </div>
            </div>
          )}
        </div>
		)
}

export default ProfileView;