import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Layout from "@components/Layout";
import { FcGoogle } from "react-icons/fc";
import { SiFacebook } from "react-icons/si";

import { logo } from "@public/assets";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();

  const [state, setState] = useState({
    username: "",
    password: "",
    loginError: "",
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleGoogleSignIn = async () => {
    await signIn("google", {
      redirect: true,
      callbackUrl: "/User/registerSocial",
    });
  };

  const handleFacebookSignIn = async () => {
    await signIn("facebook", {
      redirect: true,
      callbackUrl: "/",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      username: state.username,
      password: state.password,
      redirect: false,
      callbackUrl: "/",
    });

    if (result.error) {
      setState({
        ...state,
        loginError: result.error,
      });
    } else {
      const redirectUrl = localStorage.getItem('redirectUrl');
      if (redirectUrl) {
        localStorage.removeItem('redirectUrl');
        router.push(redirectUrl);
      }else{
        router.push("/")
      }
    }
  };

  return (
    <div className="w-screen h-screen bg-login bg-cover overflow-hidden">
      <div className="h-full bg-black/40 overflow-y-hidden">
        <Layout>
          <div className="w-full h-screen flex flex-wrap items-center justify-center ">
            <div className="flex flex-col bg-white/70 backdrop-blur-xl rounded-lg p-6 drop-shadow-xl">
              <div className="w-full text-right">
                <Link href="/" className="link text-sm">
                  Omitir
                </Link>
              </div>

              <Image src={logo} alt="app_logo" className="w-[15rem]" />
              <h1 className="w-full font-semibold text-2xl text-center py-4 text-gray-600">
                ¡Te damos la bienvenida!
              </h1>
              {state.loginError && (
                <div className="w-full p-2 mb-2 border-2 border-red-900 text-red-900 rounded-md text-center bg-red-500/30">
                  {state.loginError}
                </div>
              )}
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
              <div className="text-center my-4 text-sm text-gray-600">
                ¿Aún no tienes cuenta?{" "}
                <Link href="register" className="link">
                  Registrate
                </Link>
              </div>

              <div className="w-full flex flex-col items-center border-gray-500/20 border-t-2">
                <h3 className="pt-4 text-gray-600 font-semibold">
                  O ingresar con:
                </h3>
                <div className="flex flex-row gap-4">
                  <button onClick={handleGoogleSignIn} className="text-4xl">
                    <FcGoogle />
                  </button>
                  <button onClick={handleFacebookSignIn} className="text-4xl text-blue-600">
                    <SiFacebook />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </div>
    </div>
  );
}
