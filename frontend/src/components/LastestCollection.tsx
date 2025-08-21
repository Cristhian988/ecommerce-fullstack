import { useContext, useEffect } from "react"
import { ShopContext } from "../context/ShopContext"
import Title from "./Title"
import { useState } from "react"
import type { ProductType } from "../context/type"
import ProductItem from "./ProductItem"

export default function LastestCollection() {
  const {products} = useContext(ShopContext)
  const [latestProducts, setlatestProducts] = useState<ProductType[]>([])
  
  useEffect(() => {
    setlatestProducts(products.slice(0, 10))
  }, [products])
  return (
    <div className="my-10">
        <div className="text-center py-8 text-3xl">
            <Title text1={'LASTEST'} text2={"COLLECTION"} />
            <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
            </p>
        </div>
        
        {/* Rendering Products */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-8">
            {latestProducts.map((product, index) => (
                <ProductItem key={index} _id={product._id} name={product.name} image={product.image} price={product.price} />
            ))}
        </div>
    </div>
  )
}
