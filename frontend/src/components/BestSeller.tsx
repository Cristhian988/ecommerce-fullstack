import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import type { ProductType } from "../context/type"
import Title from "./Title"
import ProductItem from "./ProductItem"

export default function BestSeller() {
    const {products} = useContext(ShopContext)
    const [bestSeller, setBestSeller] = useState<ProductType[]>([])
    
    useEffect(() => {
        const bestProduct = products.filter((product: ProductType) => product.bestseller)
        setBestSeller(bestProduct.slice(0, 5))
    }, [products])
  return (
    <div className="my-10">
        <div className="text-center text-3xl py-8">
            <Title text1={'BEST'} text2={"SELLER"} />
            <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
            </p>
        </div>
        
        {/* Rendering Best Seller */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-8">
            {bestSeller.map((product, index) => (
                <ProductItem key={index} _id={product._id} name={product.name} image={product.image} price={product.price} />
            ))}
        </div>
    </div>
  )
}
