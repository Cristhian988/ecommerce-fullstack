import { useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import type { ProductType } from "../context/type"
import { assets } from "../assets/frontend_assets/assets"
import RelatedProducts from "../components/RelatedProducts"

export default function Product() {
  const {productId} = useParams()
  const {products, currency, addToCart} = useContext(ShopContext)
  
  const [productData, setProductData] = useState<ProductType | null>(null)
  const [image, setImage] = useState<string>('')
  const [size, setSize] = useState<string>('')
  
  const fetchProductData = async () => {
    products.map((product) => {
      if(product._id === productId) {
        setProductData(product)
        setImage(product.image[0])
        return null;
      }
    })
  }
  
  useEffect(() => {
    fetchProductData()
  }, [productId, products])
  
  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {
              productData.image.map((item: string, index: number) => {
                return (
                  <img onClick={() => setImage(item)} key={index} src={item} alt="product" className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer" />
                )
              })
            }
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} alt="" className="w-full h-auto" />
          </div>
        </div>
        {/* Product Details */}
        <div className="flex-1">
          <h1 className="text-2xl font-medium mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            {Array(4).fill(0).map((_, index) => {
              return (
                <img src={assets.star_icon} alt="" className="w-5" key={index} />
              )
            })}
            <img src={assets.star_dull_icon} alt="" className="w-5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">{currency}{productData.price}</p>
          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Seleccionar Talla</p>
            <div className="flex gap-2">
              {
                productData.sizes.map((sizeOption: string, index: number) => {
                  return (
                    <button onClick={() => setSize(sizeOption)} key={index} className={`border py-2 px-4 bg-gray-100 ${size === sizeOption ? 'bg-orange-500 text-white' : ''}`}>{sizeOption}</button>
                  )
                })
              }
            </div>
          </div>
          <button onClick={() => addToCart(productData._id, size)} className="bg-black text-white py-2 px-6 text-sm active:bg-gray-700">Agregar al Carrito</button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original</p>
            <p>Pago en Efectivo disponible en este producto</p>
            <p>Política de devolución y cambio fácil dentro de los 7 días.</p>
          </div>
        </div>
      </div>
      
      {/* Description & Review Section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm font-medium">Descripción</b>
          <p className="border px-5 py-3 text-sm font-medium">Reseñas (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>Descubre la combinación perfecta entre estilo y comodidad con esta prenda de la colección Forever. Diseñada con materiales de alta calidad, ofrece un ajuste moderno y versátil que se adapta a tu día a día.</p>
          <p>Ideal para cualquier ocasión, ya sea casual o elegante, este producto está pensado para quienes buscan destacar con confianza y personalidad.</p>
        </div>
      </div>
      
      {/* Display Related Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : <div className="opacity-0">Loading...</div>
}
