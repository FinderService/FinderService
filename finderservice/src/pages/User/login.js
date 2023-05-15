import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Layout from "@components/Layout";

import { logo } from "@public/assets";
import toast from "react-hot-toast";

export default function Login() {
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const resp = await axios.post("/api/auth/login", state);
      console.log(resp);
      toast.success(resp.data.msg);
    }catch(error){
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div className="w-screen h-screen bg-login bg-cover overflow-hidden">
      <div className="h-full bg-black/40 overflow-y-hidden">
        <Layout>
          <div className="w-full h-screen flex flex-wrap items-center justify-center ">
            <div className="flex flex-col bg-white/70 backdrop-blur-xl rounded-lg p-8 drop-shadow-xl">
              <div className="w-full text-right">
                <Link href="/" className="link">
                  Omitir
                </Link>
              </div>

              <Image src={logo} alt="app_logo" className="w-[20rem]" />
              <h1 className="w-full font-semibold text-2xl text-center py-4">
                ¡Te damos la bienvenida!
              </h1>
              <form
                onSubmit={handleSubmit}
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
                <input
                  className="form-input w-full text-center"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={state.password}
                  autoComplete="off"
                  placeholder="Contraseña"
                />
                <button
                  type="submit"
                  className="btn-navbar w-[4.5rem] text-center"
                >
                  {" "}
                  Entrar{" "}
                </button>
              </form>
              <div className="text-center mt-4 text-sm text-gray-600">
                ¿Aún no tienes cuenta?{" "}
                <Link href="register" className="link">
                  Registrate
                </Link>
              </div>
            </div>
          </div>
        </Layout>
      </div>
    </div>
  );
}
