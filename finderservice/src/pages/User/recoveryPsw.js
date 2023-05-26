import Layout from "@components/Layout";
import Footer from "@components/Footer";
import Link from "next/link";
import Image from "next/image";
import { logo } from "@public/assets";
import { useState } from "react";
import { validatePassword } from "@/utils/validators";
import { toast } from "react-hot-toast";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function recoveryPsw() {
  const [state, setState] = useState({
    password: "",
    password2: ""
  });

  const [error, setError] = useState({
    password: "",
    password2: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (state.password !== state.password2) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    const passwordError = validatePassword(state.password);
    if (passwordError) {
      setError({ ...error, password: passwordError });
      return;
    }

    try {
      const res = await axios.put("/api/updateUser/recoverPassword", state);
      toast.success(res.data.msg);
      setState({
        password: "",
        password2: ""
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Layout>
      <div className="w-full h-screen flex flex-wrap items-center justify-center">
        <div className="flex flex-col bg-white/70 backdrop-blur-xl rounded-lg p-6 drop-shadow-xl">
          <div className="w-full text-right">
            <Link href="/" className="link text-sm">
              Omitir
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center">
            <Image src={logo} alt="app_logo" className="w-[15rem]" />
          </div>
          <h1 className="w-full font-semibold text-2xl text-center py-4 text-gray-600">
            Ingresa tu nueva contraseña
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-center">
            <div className="relative">
              <input
                className={`form-input ${error.password ? "form-input-error" : ""}`}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Nueva Contraseña"
                onChange={handleChange}
                value={state.password}
              />
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={toggleShowPassword}
              >
                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible /> }
              </div>
            </div>
            <div className="relative">
              <input
                className={`form-input ${error.password2 ? "form-input-error" : ""}`}
                type={showPassword ? "text" : "password"}
                name="password2"
                placeholder="Repite la contraseña"
                onChange={handleChange}
                value={state.password2}
              />
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={toggleShowPassword}
              >
                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </div>
            </div>
            {error.password && (
              <span className="formErrorLbl">{error.password}</span>
            )}
            <button type="submit" className="btn-navbar w-[5.rem] text-center">
              Confirmar
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </Layout>
  );
}



