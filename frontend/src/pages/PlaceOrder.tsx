import { useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../components/CartTotal";
import Title from "../components/Title";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

export default function PlaceOrder() {
  const [method, setMethod] = useState<'stripe' | 'razorpay' | 'cod'>('cod')
  const {navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products} = useContext(ShopContext)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })
  
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name
    const value = event.target.value
    
    setFormData(data => ({...data, [name]: value}))
  }
  
  // const initPayment = (order: OrderType) => {
  //   const options = {
  //     key: import.meta.env.VITE_RAZORPAY_KEY_ID,
  //     amount: order.amount,
  //     currency: order.currency,
  //     name: "Order Payment",
  //     description: "Order Payment",
  //     order_id: order.id,
  //     receipt: order.receipt,
  //     handler: async (response : OrderType) => {
  //       console.log(response)
  //       try {
  //         const {data} = await axios.post(backendUrl + '/api/order/verifyRazorpay', response, {
  //           headers: {
  //             token,
  //           },
  //         })
  //         if(data.success){
  //           navigate('/orders')
  //           setCartItems({})
  //         } 
  //       } catch (error) {
  //         console.log(error)
  //         toast.error((error as Error).message)
  //       }
  //     }
  //   }
  //   const rzp = new window.Razorpay(options)
  //   rzp.open()
  // }
  
  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const orderItems = []
      
      for (const items in cartItems) {
        for(const item in cartItems[items]){
          if(cartItems[items][item] > 0){
            const itemInfo = structuredClone(products.find((product) => product._id === items))
            if(itemInfo){
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }
      
      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }
      
      switch (method) {
        // API Calls for COD
        case 'cod':
          { const response = await axios.post(backendUrl + '/api/order/place', orderData, {
            headers: {
              token,
            },
          })
          if(response.data.success){
            setCartItems({})
            navigate('/orders')
          } else{
            toast.error(response.data.message)
          }
          break; }
          
          // API Calls for Stripe
          case 'stripe':
            { const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, {
              headers: {
                token,
              },
            })
            if(responseStripe.data.success){
              const {session_url} = responseStripe.data
              window.location.replace(session_url)
            } else{
              toast.error(responseStripe.data.message)
            }
            break; }
            
            // API Calls for Razorpay
            // case 'razorpay':
            //   { const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, {
            //     headers: {
            //       token,
            //     },
            //   })
            //   if(responseRazorpay.data.success){
            //     initPayment(responseRazorpay.data.order)
            //   } else{
            //     toast.error(responseRazorpay.data.message)
            //   }
            //   break; }
        
        default:
          break;
      }
      
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/* Left Side */}
      <div className="flex flex-col gap-4 w-full sm:w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={'INFORMACIÓN'} text2={'DE ENTREGA'} />
        </div>
        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name="firstName" value={formData.firstName} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Nombre" />
          <input required onChange={onChangeHandler} name="lastName" value={formData.lastName} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Apellido" />
        </div>
        <input required onChange={onChangeHandler} name="email" value={formData.email} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="email" placeholder="Email" />
        <input required onChange={onChangeHandler} name="street" value={formData.street} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Dirección" />
        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name="city" value={formData.city} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Distrito" />
          <input required onChange={onChangeHandler} name="state" value={formData.state} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Departamento" />
        </div>
        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name="zipcode" value={formData.zipcode} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="Código postal" />
          <input required onChange={onChangeHandler} name="country" value={formData.country} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="País" />
        </div>
        <input required onChange={onChangeHandler} name="phone" value={formData.phone} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="Teléfono" />
      </div>
      
      {/* Right Side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={'MÉTODO'} text2={'DE PAGO'} />
          {/* Payment Method Selection */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div onClick={() => setMethod('stripe')} className="flex items-center gap-3 border p-2
             px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 rounded-full border ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img src={assets.stripe_logo} alt="" className="h-4 mx-4" />
             </div>
            {/* <div onClick={() => setMethod('razorpay')} className="flex items-center gap-3 border p-2
             px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 rounded-full border ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img src={assets.razorpay_logo} alt="" className="h-4 mx-4" />
             </div> */}
             <div onClick={() => setMethod('cod')} className="flex items-center gap-3 border p-2
             px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 rounded-full border ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className="text-gray-500 text-sm font-medium mx-4">PAGO EN EFECTIVO</p>
             </div>
          </div>
          
          <div className="w-full text-end mt-8">
            <button type="submit" className="bg-black text-white py-3 px-16 text-sm">REALIZAR PEDIDO</button>
          </div>
        </div>
      </div>
    </form>
  )
}
