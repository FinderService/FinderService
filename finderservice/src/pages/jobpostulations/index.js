import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Layout from "@components/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useUser } from "@context/UserContext";
import {
  validateMessage,
  validateSalary,
} from"../../utils/validationPost";

export default function Postulation() {
  const router = useRouter();
  const { userData } = useUser();

  /*  const workInfo = JSON.parse(localStorage.getItem('workInfo'))? JSON.parse(localStorage.getItem('workInfo')) : null;
  localStorage.removeItem('workInfo');  */


  const [state, setState] = useState({
    salary: "",
    message: "",
    types: [],
    profile: "worker",
    workerEmail:"",
  });
  
  const [error, setErrror] = useState({
    workerEmail:"",
    salary: "",
    message: "",
  });

  const [types, setTypes] = useState([]);
  
  const handleOnChangeTypes = (event) => {
    const value = event.target.value;
    const newType = types.filter((type) => type.name === value);

    if (value !== "Trabajo") {
      setState({
        ...state,
        type: newType,
      });
    }
  };


  const handleChange = (e) => {
     
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
    

  const getTypes = async () => {
    try {
    const res = await axios.get("/api/types"); 
    setTypes(res.data);
  } catch (error) {
      console.log(error);
    }
  };
  


 
  useEffect(() => {
    const fetchData = async () => {
      try {
        if(types.length === 0){
          await getTypes();
        }     
      } catch (error) {
        console.error('Error en la solicitud Axios:', error);
      }
    }
    fetchData();
    setState({ ...state, workerEmail: userData.email, /* jobrequest:workInfo._id  */});
    // eslint-disable-next-line
  }, []);
 

  const handleSubmit = async (e) => {
    console.log(userData);
    e.preventDefault();
    try {
      
      if ( error.salary || error.message ) {
        toast.error("Todos los campos son obligatorios");
        return;
      }

      if(state.type.length === 0){
        toast.error("Debe seleccionar el rubro correspondiente");
        return;
      }

      console.log(state);
      const resp = await axios.post("/api/jobpostulations", state);
      console.log(resp);
      if (response) {
      toast.success('Su anuncio fue publicado exitosamente');
      router.push('/HomeWorker/Postulations');
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
                <hr>
                </hr>
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
                <h3 className="text-black font-bold">Generá una nueva postulación de empleo</h3>
                
               
                    <input
                  className={`form-input ${
                    error.name ? "form-input-error" : ""
                  }`}
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

           
<div>
                Selecciona el rubro del empleo:
                <div className="flex flex-row flex-wrap gap-2 items-center justify-center">
                  <select onChange={handleOnChangeTypes}>
                    <option value="Trabajo">-Trabajo-</option>
                    {types.length !== 0 ? (
                      types.map((type) => {
                        return <option key={type.name} value={type.name}>{type.name}</option>;
                      })
                    ) : (
                      <option>Cargando...</option>
                    )}
                  </select>
                </div>

                    </div>

                

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
