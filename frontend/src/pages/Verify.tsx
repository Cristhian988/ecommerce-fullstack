import { useContext, useEffect } from "react"
import { ShopContext } from "../context/ShopContext"
import { useSearchParams } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"

export default function Verify() {
    const {navigate, token, setCartItems, backendUrl} = useContext(ShopContext)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [searchParams, setSearchParams] = useSearchParams()
    
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    
    const verifyPayment = async () => { 
        try {
            if(!token){
                return null
            }
            const response = await axios.post(backendUrl + "/api/order/verifyStripe", { orderId, success }, { headers: { token } })
            if (response.data.success) {
                setCartItems({})
                navigate("/orders")
            } else{
                navigate("/cart")
            }
        } catch (error: unknown) {
            console.log(error)
            toast.error((error as Error).message)
        }
     }
     
     useEffect(() => {
        verifyPayment()
     }, [token])
     
  return (
    <div>
      Verify
    </div>
  )
}
