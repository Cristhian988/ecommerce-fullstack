import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import ProductItem from "./ProductItem"
import type { ProductType } from "../context/type"
import Title from "./Title"

export default function RelatedProducts({category, subCategory}: {category: string, subCategory: string}) {
    const {products} = useContext(ShopContext)
    const [related, setRelated] = useState<ProductType[]>([])
    
    useEffect(() => {
      if(products.length > 0){
        let productsCopy = products.slice()
        
        productsCopy = productsCopy.filter((product) => product.category === category && product.subCategory === subCategory)
        
        setRelated(productsCopy.slice(0, 5))
      }
        
    }, [products, category, subCategory])
    
  return (
    <div className="my-24">
        <div className="text-center text-3xl py-2">
            <Title text1={'RELATED'} text2={"PRODUCTS"} />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-8">
            {related.map((product, index) => {
                return (
                    <ProductItem key={index} _id={product._id} name={product.name} image={product.image} price={product.price} />
                )
            })}
        </div>
    </div>
  )
}
