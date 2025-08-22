import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import NewsletterBox from "../components/NewsletterBox";

export default function About() {
  return (
    <>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"SOBRE"} text2={"NOSOTROS"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          src={assets.about_img}
          alt=""
          className="w-full md:max-w-[450px]"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Forever nació de una pasión por la innovación y el deseo de
            revolucionar la forma en que las personas compran moda en línea.
            Nuestro viaje comenzó con una idea simple: ofrecer una plataforma
            donde los clientes puedan descubrir, explorar y adquirir fácilmente
            una amplia gama de prendas y accesorios desde la comodidad de sus
            hogares.
          </p>
          <p>
            Desde nuestros inicios, hemos trabajado incansablemente para
            seleccionar una colección diversa de productos de alta calidad que
            se adapten a todos los gustos y estilos. Desde ropa casual y
            elegante hasta accesorios imprescindibles, ofrecemos una propuesta
            única inspirada en las últimas tendencias y respaldada por
            proveedores de confianza.
          </p>
          <b className="text-gray-800">Nuestra Misión</b>
          <p>
            En Forever, nuestra misión es empoderar a nuestros clientes con
            variedad, comodidad y confianza. Nos dedicamos a brindar una
            experiencia de compra en línea fluida y satisfactoria, que supere
            las expectativas en cada etapa: desde la navegación y el pedido
            hasta la entrega y más allá.
          </p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={"¿POR QUÉ "} text2={"ELEGIRNOS?"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-1 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Garantía de calidad:</b>
          <p className="text-gray-600">
            Seleccionamos meticulosamente y examinamos cada producto para
            garantizar que cumpla con nuestros estándares de calidad rigurosos.
          </p>
        </div>
        <div className="border px-1 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Conveniencia:</b>
          <p className="text-gray-600">
            Con nuestra interfaz intuitiva y proceso de pedido sin complicaciones,
            la compra nunca ha sido más fácil.
          </p>
        </div>
        <div className="border px-1 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Servicio al cliente:</b>
          <p className="text-gray-600">
            Nuestro equipo de profesionales dedicados está aquí para ayudarte,
            garantizando que tu satisfacción sea nuestra prioridad.
          </p>
        </div>
      </div>

      <NewsletterBox />
    </>
  );
}
