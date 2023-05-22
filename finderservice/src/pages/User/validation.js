import { useRouter } from "next/router";
import Layout from "@components/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import axios from "axios";

export default function Validation() {
  const router = useRouter();
  const validator = router.query.c;
  const email = router.query.m;

  const [state, setState] = useState({
    validator: "",
    email: "",
    validate: false,
  });

  const handlevalidate = async (obj) => {
    try {
      const resp = await axios.post("/api/auth/validate", obj);
      console.log(resp);
      if (resp.data.success) {
        setState({
          ...state,
          validate: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    const handlevalidate = (validatorValue, emailValue) => {
      // Your handlevalidate code here
    };

    if (validator !== "") {
      console.log(validator);
      handlevalidate(validator, email);
    }

    return () => {
      // Clean-up code here (if applicable)
    };
  }, [validator, email]);

  // useEffect(() => {
  //   if (validator !== "") {
  //     console.log(validator);
  //     handlevalidate({ validator: validator, email: email });
  //   }
  //   return () => {};
  // }, [validator, email,handlevalidate]);

  return (
    <div className="bg-gray-300 w-screen h-screen overflow-x-hidden overflow-y-hidden">
      <Layout>
        <div className="w-full h-screen flex flex-col items-center justify-center mt-[-5rem]">
          {state.validate ? (
            <div className="text-center">
              <div className="text-8xl mb-4 text-green-700 flex justify-center">
                <AiOutlineCheckCircle />
              </div>
              <h3 className="text-3xl text-gray-700 mb-4">Correo valido!</h3>
              <h4 className="text-2xl text-gray-500">
                Ahora puede ingresar al sitio haciendo
                <Link href="login" className="link">
                  click aqui
                </Link>
              </h4>
            </div>
          ) : (
            <div className="text-3xl text-gray-700">
              Espere mientras validamos su correo...
            </div>
          )}
        </div>
      </Layout>
    </div>
  );
}
