import { assets } from '../assets/frontend_assets/assets'

export default function OurPolicy() {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
        <div>
            <img src={assets.exchange_icon} alt="" className="w-12 m-auto mb-5" />
            <p className='font-semibold'>CAMBIO GARANTIZADO</p>
            <p className='text-gray-400'>Ofrecemos cambios sin complicaciones.</p>
        </div>
        <div>
            <img src={assets.quality_icon } alt="" className="w-12 m-auto mb-5" />
            <p className='font-semibold'>POLÍTICA DE 7 DÍAS</p>
            <p className='text-gray-400'>Política de devolución gratis dentro de 7 días.</p>
        </div>
        <div>
            <img src={assets.support_img} alt="" className="w-12 m-auto mb-5" />
            <p className='font-semibold'>SOPORTE AL CLIENTE</p>
            <p className='text-gray-400'>Estamos disponibles para ti las 24 horas.</p>
        </div>
    </div>
  )
}
