import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "@components/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useUser } from "@context/UserContext";
import { validateMessage, validateSalary } from "../../utils/validationPost";
import { useWorkers } from "@context/WorkersContext";

export default function Postulation() {
  const router = useRouter();
  const { userData } = useUser();
  const { saveData } = useWorkers();

  const [state, setState] = useState({
    salary: "",
    message: "",
    jobrequest: "",
    workerEmail: "",
  });

  const [error, setErrror] = useState({
    workerEmail: "",
    salary: "",
    message: "",
  });

  const handleChange = (e) => {
    setState({
      ...state,
      workerEmail: userData.email,
      jobrequest: saveData._id,
    })
    if (e.target.name === "salary") {
      setErrror({
        ...error,
        [e.target.name]: validateSalary(e.target.value),
      });
    }
    if (e.target.name === "message") {
      setErrror({
        ...error,
        [e.target.name]: validateMessage(e.target.value),
      });
    }

    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setState({
      ...state,
      workerEmail: userData.email,
      jobrequest: saveData._id,
    });
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (error.salary || error.message) {
        toast.error("Todos los campos son obligatorios");
        return;
      }
      console.log(state);
      const resp = await axios.post("/api/jobpostulations", state);
 
      if (resp) {
        toast.success("Su anuncio fue publicado exitosamente");
        router.push("/HomeWorker/Postulations");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.msg);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-b from-gray-300 to-black">
      <div className="h-full bg-white/40 overflow-y-scroll h-screen max-w-md mx- flex-grow overflow-y-scroll">
        <Layout>
          <div className="flex flex-row items-center justify-center h-screen overflow-y-hidden">
            <div className="flex flex-col text-black mr-8 w-[30rem]">
              <>
                <h1 className="text-3xl font-titleFont font-bold mb-2">
                  Consigue empleo ahora
                </h1>
                <hr></hr>
                <ul className="list-disc mt-6">
                  <li>¡Completa el siguiente formulario, a solo un click!</li>
                </ul>
              </>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col bg-white p-6 w-[25rem] gap-2 bg-white/70 backdrop-blur-xl rounded-lg drop-shadow-xl border-8 border-blue-500"
              autoComplete="off"
            >
              <h3 className="text-black font-bold">
                Generá una nueva postulación de empleo
              </h3>

              <input
                className={`form-input ${error.name ? "form-input-error" : ""}`}
                type="text"
                name="salary"
                placeholder="Tarifa estimada"
                onChange={handleChange}
                value={state.salary}
              />
              {error.salary && (
                <span className="formErrorLbl">{error.salary}</span>
              )}
              <input
                className={`form-input ${
                  error.message ? "form-input-error" : ""
                }`}
                type="text"
                name="message"
                placeholder="Mensaje o descripción"
                onChange={handleChange}
                value={state.message}
              />
              {error.message && (
                <span className="formErrorLbl">{error.message}</span>
              )}

              <div className="flex items-end justify-center">
                <button
                  type="submit"
                  className="btn-navbar w-[6.5rem] text-center text-black font-bold"
                  onClick={handleSubmit}
                >
                  Añadir postulación
                </button>
              </div>
            </form>
          </div>
        </Layout>
      </div>
    </div>
  );
}
