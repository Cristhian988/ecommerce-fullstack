import { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

interface Order {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string[];
  category: string;
  subCategory: string;
  sizes: string[];
  date: number;
  bestseller: boolean;
}

export default function List({token}: {token: string}) {
const [list, setList] = useState<Order[]>([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      
      if (response.data.success) {
        setList(response.data.products);
        console.log(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error : unknown) {
      console.log(error);
      toast.error((error as Error).message);
    }
  };
  
  const removeProduct = async (id: string) => {
    try {
      const response = await axios.post(backendUrl + "/api/product/remove", {id}, {headers: {token}});
      
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error : unknown) {
      console.log(error);
      toast.error((error as Error).message);
    }
  }

  useEffect(() => {
    fetchList();
  }, []);
  return (
    <>
    <p className="mb-2">Lista de Productos</p>
      <div className="flex flex-col gap-2">
        {/* List Table Title */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Imagen</b>
          <b>Nombre</b>
          <b>Categoría</b>
          <b>Precio</b>
          <b className="text-center">Acciones</b>
        </div>
        {/* Product List */}
        {list.map((item, idx) => (
          <div key={idx} className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm">
            <img className="w-12" src={item.image[0]} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{currency}{item.price}</p>
            <p className="text-right md:text-center cursor-pointer text-xs md:text-lg" onClick={() => removeProduct(item._id)}>X</p>
          </div>
        ))}
      </div>
    </>
  )
}
