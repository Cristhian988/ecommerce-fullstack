import { assets } from "../assets/frontend_assets/assets";

export default function Footer() {
  return (
    <footer>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} alt="" className="w-32 mb-5" />
          <p className="w-full md:w-2/3 text-gray-600">
            Forever es tu tienda online de moda, donde encuentras las últimas
            tendencias en ropa, calzado y accesorios. Nuestro objetivo es
            brindarte estilo, comodidad y calidad en cada prenda.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">EMPRESA</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Inicio</li>
            <li>Sobre Nosotros</li>
            <li>Envíos y Devoluciones</li>
            <li>Política de Privacidad</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">CONTÁCTANOS</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+51 987 654 321</li>
            <li>contact@forever.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          © {new Date().getFullYear()} Forever. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
