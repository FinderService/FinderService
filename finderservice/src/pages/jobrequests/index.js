import { useEffect, useState } from "react";
import Layout from "@components/Layout";
import axios from "axios";
import toast from "react-hot-toast";

import {
  validateName,
  validateDate,
  validateDescription,
  validatePhoto,
  validateAddress,
} from"../../utils/validationReq";

export default function Postulation() {
  const [state, setState] = useState({
    name: "",
    date: "",
    description: "",
    photo: "",
    types: [],
    address: "",
    profile: "employer",
  });
  
  const [error, setErrror] = useState({
    name: "",
    date: "",
    description: "",
    photo: "",
    types: [],
    address: "",
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
    if (e.target.name === "name") {
      setErrror({
        ...error,
        [e.target.name]: validateName(e.target.value),
      });
    }
    if (e.target.name === "date") {
      setErrror({
        ...error,
        [e.target.date]: validateDate(e.target.value),
      });
    }
    if (e.target.name === "description") {
      setErrror({
        ...error,
        [e.target.description]: validateDescription(e.target.value),
      });
    }
    if (e.target.name === "address") {
      setErrror({
        ...error,
        [e.target.address]: validateAddress(e.target.value),
      });
    }
    if (e.target.name === "photo") {
      setErrror({
        ...error,
        [e.target.photo]: validatePhoto(e.target.value),
      });
    }
    

    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };


  const getTypes = async () => {
    let res = await axios.get("/api/types"); 
    setTypes(res.data);
  };

  useEffect(() => {
    getTypes();
  }, []);



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        error.name ||
        error.description ||
        error.date ||
        error.photo ||
        error.address 
      ) {
        toast.error("Todos los campos son obligatorios");
        return;
      }

      if(state.profile === 'employer' && state.types.length <= 0){
        toast.error("Seleccione al menos un rubro");
        return;
      }

      console.log(state.types)
      const resp = await axios.post("/api/jobrequests", state);
      console.log(resp);
      toast.success(resp.data.msg);
      setState({
        ...state,
        name: "",
        date: "",
        description: "",
        photo: "",
        address: "",
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  }

  /* const handlePostulation = () => {
    alert("El posteo fue creado exitosamente")
  }; */

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setState((prevState) => ({...prevState, photo: file }));
  };

  return (
    <div className="h-screen bg-gradient-to-b from-gray-300 to-black">
      <div className="h-full bg-black/40 overflow-y-scroll h-screen max-w-md mx- overflow-y-scroll flex-grow ">
        <Layout>
          <div className="flex flex-row items-center justify-center h-screen overflow-y-hidden">
            <div className="flex flex-col text-white mr-8 w-[30rem]">
                <>
                  <h1 className="text-3xl font-titleFont font-bold mb-2">
                  ¡Completa el siguiente formulario y encuentra una solución a tu necesidad!
                  </h1>
                <hr>

                </hr>
                  <ul className="list-disc mt-6">
                    <li>Puedes agregar una foto del trabajo requerido, así el empleado que contrates podrá ver de qué se trata la petición en cuestión</li>
                    <li>¡A solo un click, no esperes más!</li>
                  </ul>
                </>
              
            </div>
 
              <form
                 onSubmit={handleSubmit} 
                className="flex flex-col bg-white p-6 w-[25rem] gap-2 bg-white/70 backdrop-blur-xl rounded-lg drop-shadow-xl border-8 border-green-500 p-8 rounded-lg bg-gray-200"
                autoComplete="off"
              >
                <h3 className="text-black font-bold">Generar solicitud de empleo</h3>
                
                <input
                  className={`form-input ${
                    error.name ? "form-input-error" : ""
                  }`}
                  type="text"
                  name="name"
                  placeholder="Nombre asignado"
                  onChange={handleChange}
                  value={state.name}
                />
                {error.name && (
                  <span className="formErrorLbl">{error.name}</span>
                )}
                 <input
                  className={`form-input ${
                    error.description ? "form-input-error" : ""
                  }`}
                  type="text"
                  name="description"
                  placeholder="Descripción"
                  onChange={handleChange}
                  value={state.description}
                />
                {error.description && (
                  <span className="formErrorLbl">{error.description}</span>
                )}
    
                    <input
                  className={`form-input ${
                    error.address ? "form-input-error" : ""
                  }`}
                  type="text"
                  name="address"
                  placeholder="Dirección"
                  onChange={handleChange}
                  value={state.address}
                />
                {error.address && (
                  <span className="formErrorLbl">{error.address}</span>
                )}
               <div>
                  <input
                    type="date"
                    name="date"
                    className={`form-input w-full ${
                      error.date ? "form-input-error" : ""
                    }`}
                    value={state.date}
                    onChange={handleChange}
                  />
                  {error.date && (
                    <span className="formErrorLbl">{error.date}</span>
                  )}
                </div>
                  <div className="form-input">
                   <label htmlFor="profile-picture">Adjuntar foto del trabajo a realizar</label>
                    <input
                   className="form-control"
                   type="file"
                   accept="image/*"
                   placeholder="Puedes agregar una imagen de referencia"
                   name="profile-picture"
                   onChange={handleFileChange}
                     />
                   </div>
                
                
                
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
                    className="btn-navbar w-[6.5rem] text-center text-black font-bold border border-green-500"
                    onClick={handleSubmit}
                    
                  >
                    Añadir solicitud
                  </button>
    
                </div>
              </form>
            
          </div>
        </Layout>
      </div>
    </div>
  );
}
