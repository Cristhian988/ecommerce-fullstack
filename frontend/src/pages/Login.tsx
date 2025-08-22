import { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function Login() {
  const [currentState, setCurrentState] = useState<"Iniciar Sesión" | "Crear Cuenta">(
    "Iniciar Sesión"
  );
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentState === "Crear Cuenta") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
    }
  };
  
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);
  
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="playfair text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === "Iniciar Sesión" ? (
        ""
      ) : (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          placeholder="Nombre"
          className="w-full px-3 py-2 border border-gray-800"
          required
        />
      )}
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="text"
        placeholder="Email"
        className="w-full px-3 py-2 border border-gray-800"
        required
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        placeholder="Contraseña"
        className="w-full px-3 py-2 border border-gray-800"
        required
      />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">¿Olvidaste tu contraseña?</p>
        {currentState === "Iniciar Sesión" ? (
          <p
            onClick={() => setCurrentState("Crear Cuenta")}
            className="cursor-pointer"
          >
            Crear Cuenta
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Iniciar Sesión")}
            className="cursor-pointer"
          >
            Iniciar Sesión
          </p>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-black text-white font-light py-2 mt-4"
      >
        {currentState === "Iniciar Sesión" ? "Iniciar Sesión" : "Crear Cuenta"}
      </button>
    </form>
  );
}
