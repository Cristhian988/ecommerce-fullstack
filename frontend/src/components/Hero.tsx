import { assets } from "../assets/frontend_assets/assets"

export default function Hero() {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-400">
        {/* Hero Left Side */}
        <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
            <div className="text-[#414141]">
                <div className="flex items-center gap-2">
                    <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
                    <p className="text-sm font-medium md:text-base">LO MAS VENDIDO</p>
                </div>
                <h1 className="playfair text-3xl sm:py-3 lg:text-5xl leading-relaxed">Colección Nueva</h1>
                <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold md:text-base">DESCÚBRELO YA</p>
                    <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
                </div>
            </div>
        </div>
        {/* Hero Right Side */}
        <img className="w-full sm:w-1/2" src={assets.hero_img} alt="hero" />
    </div>
  )
}
