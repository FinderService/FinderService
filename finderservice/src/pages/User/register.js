import { useState } from "react";
import Link from "next/link";
import Layout from "@components/Layout";
import { RiMailCheckLine } from 'react-icons/ri';

import axios from "axios";
import toast from "react-hot-toast";

import { validateUsername, validatePassword, validateName, validatePhone, validateBirth } from "@/utils/validators";

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

  const [ error, setErrror ] = useState({
    name: "",
    last: "",
    phone: "",
    birth: "",
    username: "",
    password: "",
  })

  const handleChange = (e) => {

    if(e.target.name === 'name' || e.target.name === 'last'){
      setErrror({
        ...error,
        [e.target.name]: validateName(e.target.value)
      })
    }

    if(e.target.name === 'phone'){
      setErrror({
        ...error,
        [e.target.name]: validatePhone(e.target.value)
      })
    }

    if(e.target.name === 'username'){
      setErrror({
        ...error,
        [e.target.name]: validateUsername(e.target.value)
      })
    }

    if(e.target.name === 'password'){
      setErrror({
        ...error,
        [e.target.name]: validatePassword(e.target.value)
      })
    }

    if(e.target.name === 'birth'){
      setErrror({
        ...error,
        [e.target.name]: validateBirth(e.target.value)
      })
    }

    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      if( error.name || error.last || error.phone || error.birth || error.password ){
        toast.error('Todos los campos son obligatorios');
        return;
      }

      if( !state.name || !state.last || !state.phone || !state.birth || !state.password ){
        toast.error('Todos los campos son obligatorios');
        return;
      }
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
                autoComplete="off"
              >
                <h3>Registro</h3>
                <input
                  className={`form-input ${ error.name ? 'form-input-error' : '' }`}
                  type="text"
                  name="name"
                  placeholder="Nombre"
                  onChange={handleChange}
                  value={state.name}
                />
                { error.name && <span className="formErrorLbl">{error.name}</span>}
                <input
                  className={`form-input ${ error.last ? 'form-input-error' : '' }`}
                  type="text"
                  name="last"
                  placeholder="Apellido"
                  onChange={handleChange}
                  value={state.last}
                />
                { error.last && <span className="formErrorLbl">{error.last}</span>}
                <input
                  className={`form-input ${ error.phone ? 'form-input-error' : '' }`}
                  type="text"
                  name="phone"
                  placeholder="Teléfono"
                  onChange={handleChange}
                  value={state.phone}
                />

                { error.phone && <span className="formErrorLbl">{error.phone}</span>}
                <div>
                  <input
                    type="date"
                    name="birth"
                    className={`form-input w-full ${ error.birth ? 'form-input-error' : '' }`}
                    value={state.birth}
                    onChange={handleChange}
                  />
                { error.birth && <span className="formErrorLbl">{error.birth}</span>}
                </div>
                <input
                  className={`form-input ${ error.username ? 'form-input-error' : '' }`}
                  type="text"
                  name="username"
                  placeholder="Email"
                  onChange={handleChange}
                  value={state.username}
                />
                { error.username && <span className="formErrorLbl">{error.username}</span>}
                <input
                  className={`form-input ${ error.password ? 'form-input-error' : '' }`}
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  onChange={handleChange}
                  value={state.password}
                />
                { error.password && <span className="formErrorLbl">{error.password}</span>}
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
