import { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/admin_assets/assets";

interface OrderProduct {
  _id: string;
  name: string;
  price: number;
  image: string[];
  quantity: number;
  size: string;
}

interface Order {
  _id: string;
  user: string;
  items: OrderProduct[];
  amount: number;
  paymentMethod: string;
  status: string;
  date: string;
  payment: boolean;
  address: {
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    state: string;
    zipcode: string;
    country: string;
    phone: string;
  };
}

export default function Orders({ token }: { token: string }) {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error: unknown) {
      console.log(error);
      toast.error((error as Error).message);
    }
  };
  
  const statusHandler = async (event : React.ChangeEvent<HTMLSelectElement>, orderId: string) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      
      if (response.data.success) {
        await fetchAllOrders();
      } 
    } catch (error: unknown) {
      console.log(error);
      toast.error((error as Error).message);
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <>
      <h3>Order Page</h3>
      <div>
        {orders.map((order, idx) => (
          <div className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] items-start gap-3 border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700" key={idx}>
            <img className="w-12" src={assets.parcel_icon} alt="" />
            <div>
              <div>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return (
                      <p className="py-0.5" key={index}>
                        {item.name} x {item.quantity} <span>{item.size}</span>
                      </p>
                    );
                  } else {
                    return (
                      <p className="py-0.5" key={index}>
                        {item.name} x {item.quantity} <span>{item.size}</span>
                      </p>
                    );
                  }
                })}
              </div>
              <p className="mt-3 mb-2 font-medium">{order.address.firstName + " " + order.address.lastName}</p>
              <div>
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    "," +
                    order.address.state +
                    "," +
                    order.address.country +
                    "," +
                    order.address.zipcode}
                </p>
              </div>
              <p>{order.address.phone}</p>
            </div>
            <div>
              <p className="text-sm sm:text-[15px]">Items : {order.items.length}</p>
              <p className="mt-3">Method: {order.paymentMethod}</p>
              <p>Payment : {order.payment ? "Done" : "Pending"}</p>
              <p>Date : {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className="text-sm sm:text-[15px]">{currency}{order.amount}</p>
            <select value={order.status} onChange={(e) => statusHandler(e, order._id)} className="p-2 font-medium border border-gray-300 rounded-md">
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </>
  );
}
