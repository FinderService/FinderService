import Layout from "@components/Layout";
import Footer from "@components/Footer";
import Link from "next/link";
import Image from "next/image";
import { logo } from "@public/assets";
import { useState } from "react";
import { validateUsername } from "@/utils/validators";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function recovery() {

    const [ state, setState ] = useState({
        username: "",
    })

    const [ error, setError] = useState({
      username: "",
    })

    const handleChange = (e) => {
      if (e.target.username === "username"){
        setError({
          ...error,
          [e.target.username]: validateUsername(e.target.value)
        }) 
      }
        setState({
          ...state,
          [e.target.username]: e.target.value,
        });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          if (error.username) {
            toast.error("Por favor ingrese su correo");
            return;
          }
          const res = await axios
        } catch (error) {
          console.log(error);
        }
      }

    //   const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const result = await signIn("credentials", {
    //       username: state.username,
    //       redirect: false,
    //       callbackUrl: "/",
    //     });
    
    //     if (result.error) {
    //       setState({
    //         ...state,
    //         loginError: result.error,
    //       });
    //     } else {
    //       const redirectUrl = localStorage.getItem('redirectUrl');
    //       if (redirectUrl) {
    //         localStorage.removeItem('redirectUrl');
    //         router.push(redirectUrl);
    //       }else{
    //         router.push("/")
    //       }
    //     }
    //   };


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
                //onSubmit={handleSubmit}
                className="flex flex-col gap-2 items-center"
              >
                <input
                  className="form-input w-full text-center"
                  type="text"
                  name="username"
                  onChange={handleChange}
                  value={state.username}
                  autoComplete="off"
                  placeholder="Email"
                />
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
