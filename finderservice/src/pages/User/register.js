import { useState } from "react";
import Link from "next/link";
import Layout from "@components/Layout";
import { RiMailCheckLine } from 'react-icons/ri';

import axios from "axios";
import toast from "react-hot-toast";

export default function Register() {
  const [state, setState] = useState({
    name: "",
    last: "",
    phone: "",
    birth: "",
    username: "",
    password: "",
    register: false,
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post("/api/auth/register", state);
      console.log(resp);
      toast.success(resp.data.msg);
      setState({
        ...state,
        name: "",
        last: "",
        phone: "",
        birth: "",
        password: "",
        register: true,
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div className="bg-register bg-cover w-full h-screen">
      <div className="h-full bg-black/40 overflow-y-hidden">
        <Layout>
          <div className="flex flex-row items-center justify-center h-screen overflow-y-hidden">
            <div className="flex flex-col text-white mr-8">
              <h1 className="text-4xl font-titleFont mb-2 w-[20ch]">
                Empieza a ofertar tus servicios en la app
              </h1>
              <h2 className="text-3xl font-titleFont font-bold mb-2">
                La mejor opción de autoempleo{" "}
              </h2>
              <ul className="list-disc mt-6">
                <li>El mejor canal para conseguir empleo</li>
                <li>Al alcance de miles de empleadores</li>
                <li>Eliges en donde y cuando trabajar</li>
              </ul>
              <h3 className="mt-6 text-xl">¡Regístrate ahora mismso!</h3>
            </div>
            {state.register ? (
              <div
                className="flex flex-col bg-white p-6 w-[25rem] gap-2 bg-white/70 backdrop-blur-xl rounded-lg drop-shadow-xl"
              >
                <div className="text-8xl flex items-center justify-center text-green-600">
                  <RiMailCheckLine />
                </div>
                  <h1 className="text-2xl mb-4 font-semibold font-titleFont text-gray-900 text-center">¡Gracias por registrarte!</h1>
                  <h3 className="text-xl text-gray-700 text-center mb-4">
                    Hemos enviado un correo a <span className="font-semibold">{ state.username }</span> con las instrucciones para seguir con el proceso de registro. 
                  </h3>
              </div>

            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col bg-white p-6 w-[25rem] gap-2 bg-white/70 backdrop-blur-xl rounded-lg drop-shadow-xl"
              >
                <h3>Registro</h3>
                <input
                  className="form-input"
                  type="text"
                  name="name"
                  placeholder="Nombre"
                  onChange={handleChange}
                  value={state.name}
                />
                <input
                  className="form-input"
                  type="text"
                  name="last"
                  placeholder="Apellido"
                  onChange={handleChange}
                  value={state.last}
                />
                <input
                  className="form-input"
                  type="text"
                  name="phone"
                  placeholder="Teléfono"
                  onChange={handleChange}
                  value={state.phone}
                />

                <div>
                  <input
                    type="date"
                    name="birth"
                    className="form-input w-full"
                    value={state.birth}
                    onChange={handleChange}
                  />
                </div>
                <input
                  className="form-input"
                  type="text"
                  name="username"
                  placeholder="Email"
                  onChange={handleChange}
                  value={state.username}
                />
                <input
                  className="form-input"
                  type="text"
                  name="password"
                  placeholder="Contraseña"
                  onChange={handleChange}
                  value={state.password}
                />
                <div className="flex items-end justify-center">
                  <button
                    type="submit"
                    className="btn-navbar w-[6.5rem] text-center"
                  >
                    Registrarse
                  </button>
                </div>

                <div className="text-center mt-4 text-sm text-gray-600">
                  ¿Ya tienes cuenta?{" "}
                  <Link href="login" className="link">
                    Ir al login
                  </Link>
                </div>
              </form>
            )}
          </div>
        </Layout>
      </div>
    </div>
  );
}
