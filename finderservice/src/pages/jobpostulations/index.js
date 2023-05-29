import { useEffect, useState, useContext } from "react";
import { useRouter } from 'next/router';
import Layout from "@components/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { JobpostulationsContext } from "@context/JobpostulationsContext";
import {
  validateMessage,
  validateSalary,
  validateState,
} from"../../utils/validationPost";

export default function Postulation() {
  const router = useRouter();
  const { addJobPostulation } = useContext(JobpostulationsContext);
  
  const [state, setState] = useState({
    phone: "",
    salary: "",
    message: "",
    state: "",  
    types: [],
    profile: "worker",
  });
  
  const [error, setErrror] = useState({
    phone: "",
    salary: "",
    message: "",
    state: "",
  });

  const [types, setTypes] = useState([]);
  
  const handleOnChangeTypes = (type) => {
    let newTypes = [];
    if (state.types.length > 0) {
      let res = state.types.filter((t) => type === t);
      console.log(res);
      if (res.length > 0) {
        newTypes = state.types.filter((t) => type !== t);
      } else {
        newTypes = [...state.types, type];
      }
    } else {
      newTypes.push(type);
    }

    setState({
      ...state,
      types: newTypes,
    });
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
      if (e.target.name === "state") {
        setErrror({
          ...error,
          [e.target.name]: validateState(e.target.value),
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
    //eslint-disable-next-line
  }, []);
 



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        error.phone ||
        error.salary ||
        error.message ||
        error.state 
      ) {
        toast.error("Todos los campos son obligatorios");
        return;
      }

      if(state.profile === 'worker' && state.types.length <= 0){
        toast.error("Seleccione al menos un rubro");
        return;
      }

      const resp = await axios.post("/jobpostulations", state);
      addJobPostulation(resp.data);
      toast.success('Su anuncio fue publicado exitosamente');
      setState({
        ...state,
        phone: "",
        salary: "",
        message: "",
        profile: "worker",
        state: "",
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
    router.push('/HomeWorker/Postulations');
  }


  return (
    <div className="h-screen bg-gradient-to-b from-black to-gray-300">
      <div className="h-full bg-black/40 overflow-y-scroll h-screen max-w-md mx- flex-grow overflow-y-scroll">
        <Layout>
          <div className="flex flex-row items-center justify-center h-screen overflow-y-hidden">
            <div className="flex flex-col text-white mr-8 w-[30rem]">
                <>
                  <h1 className="text-3xl font-titleFont font-bold mb-2">
                  ¡Completa el siguiente formulario y consigue empleo ahora!
                  </h1>
                <hr>
                </hr>
                  <ul className="list-disc mt-6">
                    <li>¡A solo un click, no esperes más!</li>
                  
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

           
            

                      Selecciona el rubro del empleo:
                    <div className="flex flex-row flex-wrap gap-2 items-center justify-center">
           
                      {types.length &&
                        types?.map(({ name, _id: id }, index) => {
                          return (
                            <div
                              key={index}
                              className="border-2 rounded-md p-1 bg-slate-200 flex flex-row gap-1"
                            >
                              <input
                                type="checkbox"
                                id={`chk-gen-${index}`}
                                name="typeChk"
                                value={id}
                                onChange={(e) => {
                                  handleOnChangeTypes(name);
                                }}
                              />
                              <label htmlFor={`chk-gen-${index}`}>{name}</label>
                            </div>
                          );
                        })}
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
