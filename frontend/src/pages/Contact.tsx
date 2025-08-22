import { assets } from "../assets/frontend_assets/assets";
import NewsletterBox from "../components/NewsletterBox";
import Title from "../components/Title";

export default function Contact() {
    return (
        <>
        <div className="text-2xl text-center pt-10 border-t">
            <Title text1={"CONTÁCTANOS"} text2={"AQUÍ"} />
        </div>
        <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
            <img src={assets.contact_img} alt="" className="w-full md:max-w-[480px]" />
            <div className="flex flex-col justify-center items-center gap-6">
                <p className="text-xl font-semibold text-gray-600">Nuestra Tienda</p>
                <p className="text-gray-500">Av. Los Emprendedores 123, El Agustino, Lima – Perú</p>
                <p className="text-gray-500">Tel: (+51) 987 654 321 <br />Email: admin@forever.com</p>
                <p className="text-xl font-semibold text-gray-600">Carreras en Forever</p>
                <p className="text-gray-500">Descubre mas sobre nuestros equipos y nuestras vacantes</p>
                <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">Ver Vacantes</button>
            </div>
        </div>
        <NewsletterBox />
        </>
    )
}