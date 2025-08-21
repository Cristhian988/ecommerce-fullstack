import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import Title from "../components/Title"
import axios from "axios"
import type { OrderItemType, OrderType } from "../context/type"

export default function Orders() {
    const {backendUrl, token, currency} = useContext(ShopContext)
    const [orderData, setOrderData] = useState<OrderItemType[]>([])
    const loadOrderData = async () => {
        try {
            if(!token){
                return null
            }
            
            const response = await axios.post(backendUrl + '/api/order/userorders', {}, {
                headers: {token}
            })
            if(response.data.success){
                const allOrdersItem : OrderItemType[] = []
                
                response.data.orders.map((order : OrderType) => {
                    order.items.map((item : OrderItemType) => {
                        item['status'] = order.status
                        item['payment'] = order.payment
                        item['paymentMethod'] = order.paymentMethod
                        item['date'] = order.date
                        allOrdersItem.push(item)
                    })
                })
                setOrderData(allOrdersItem.reverse())
            }
            
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        loadOrderData()
    }, [token])
    
    return (
        <div className="border-t pt-16">
            <div className="text-2xl my-3">
                <Title text1={'MY'} text2={'ORDERS'} />
            </div>
            <div>
                {orderData.slice(0,4).map((product, index) => (
                  <div key={index} className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div className="flex items-start gap-6 text-sm">
                        <img src={product.image[0]} alt="" className="w-16 sm:w-20" />
                        <div>
                            <p className="sm:text-base font-medium">{product.name}</p>
                            <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                                <p className="text-lg">{currency}{product.price}</p>
                                <p>Quantity: {product.quantity}</p>
                                <p>Size: {product.size}</p>
                            </div>
                            <p className="mt-1">Date: <span className="text-gray-400">{new Date(product.date).toDateString()}</span></p>
                            <p className="mt-1">Payment: <span className="text-gray-400">{product.paymentMethod}</span></p>
                        </div>
                    </div>
                    <div className="md:w-1/2 flex justify-between">
                        <div className="flex items-center gap-2">
                            <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                            <p className="text-sm md:text-base">{product.status}</p>
                        </div>
                        <button onClick={loadOrderData} className="border px-4 py-2 text-sm font-medium rounded-sm cursor-pointer">Track Order</button>
                    </div>
                  </div>  
                ))}
            </div>
        </div>
    )
}