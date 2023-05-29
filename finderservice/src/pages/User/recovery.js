import Layout from "@components/Layout";
import Footer from "@components/Footer";
import Link from "next/link";
import Image from "next/image";
import { logo } from "@public/assets";
import { useState } from "react";
import { validateUsername } from "@/utils/validators";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function Recovery() {

    const [ state, setState ] = useState({
        username: "",
    })

    const [ error, setError] = useState({
      username: "",
    })

    const handlerChange = (e) => {
      if (e.target.username === "username"){
        setError({
          ...error,
          [e.target.name]: validateUsername(e.target.value)
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
          if (error.username) {
            toast.error("Por favor ingrese su correo");
            return;
          }
          const res = await axios.put("/api/updateUser/mailRecoverPassword", state)
          toast.success(res.data.msg);
          setState({
            ...state,
            username: "",
          })
        } catch (error) {
          console.log(error);
          toast.error(error.response.data.msg);
        }
      }

  return (
    <Layout>
      <div className="w-full h-screen flex flex-wrap items-center justify-center ">
            <div className="flex flex-col bg-white/70 backdrop-blur-xl rounded-lg p-6 drop-shadow-xl">
              <div className="w-full text-right">
                <Link href="/" className="link text-sm">
                  Omitir
                </Link>
              </div>
            <div className="flex flex-wrap items-center justify-center">
              <Image src={logo} alt="app_logo" className="w-[15rem]" /></div>
              <h1 className="w-full font-semibold text-2xl text-center py-4 text-gray-600">
                Ingresa tu email para recuperar tu contraseña
              </h1>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-2 items-center"
              >
                {/* <input
                  className="form-input w-full text-center"
                  type="text"
                  name="username"
                  onChange={handlerChange}
                  value={state.username}
                  autoComplete="off"
                  placeholder="Email"
                /> */}
                <input
                  className={`form-input ${
                    error.username ? "form-input-error" : ""
                  }`}
                  type="text"
                  name="username"
                  placeholder="Email"
                  onChange={handlerChange}
                  value={state.username}
                />
                {error.username && (
                  <span className="formErrorLbl">{error.username}</span>
                )}
                <button
                  type="submit"
                  className="btn-navbar w-[4.5rem] text-center"
                >
                  {" "}
                  Enviar{" "}
                </button>
              </form>
              </div>
              </div>
    <Footer/>
    </Layout>
  )
}
