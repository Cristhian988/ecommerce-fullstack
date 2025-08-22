import { toast } from "react-toastify"
import { useState } from "react"

export default function NewsletterBox() {
  const [email, setEmail] = useState('')
  
    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if(!email){
            toast.error('Por favor, ingresa un correo electrónico')
            return
        }
        toast.success('Suscripción exitosa')
        setEmail('')
    }
  return (
    <div className="text-center">
        <p className="text-2xl font-medium text-gray-800">Suscríbete ahora y recibe un 20% de descuento</p>
        <p className="text-gray-400 mt-3">Recibe ofertas exclusivas y actualizaciones sobre las últimas colecciones.</p>
        <form onSubmit={onSubmitHandler} className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3">
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Ingresa tu correo" className="w-full sm:flex-1 outline-none" required />
            <button type="submit" className="bg-black text-white text-xs px-10 py-4">Suscríbete</button>
        </form>
    </div>
  )
}
