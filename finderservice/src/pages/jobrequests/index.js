import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import Layout from "@components/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import {
  validateDescription,
  validatePhoto,
  validateAddress,
} from "../../utils/validationReq";
import { useUser } from "@context/UserContext";


export default function Postulation() {
  const router = useRouter();
  const { userData } = useUser();

  const [state, setState] = useState({
    employerEmail: userData.email,
    title: "",
    description: "",
    // photo: null,
    type: [],
  });

  const [error, setErrror] = useState({
    title: "",
    description: "",
    // photo: "",
    type: [],
    address: "",
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
    if (e.target.name === "title") {
      setErrror({
        ...error,
        [e.target.name]: validateDescription(e.target.value),
      });
    }
    if (e.target.name === "description") {
      setErrror({
        ...error,
        [e.target.name]: validateDescription(e.target.value),
      });
    }
    if (e.target.name === "address") {
      setErrror({
        ...error,
        [e.target.name]: validateAddress(e.target.value),
      });
    }
    if (e.target.name === "photo") {
      setErrror({
        ...error,
        [e.target.name]: validatePhoto(e.target.value),
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
  };
  fetchData();
    //eslint-disable-next-line
  }, []);

  const handleSubmit = async (e) => {
    console.log(state);
    e.preventDefault();
    try {
      setState({ ...state, employerEmail: userData.email });
      if (error.title || error.description) {
        toast.error("Todos los campos son obligatorios");
        return;
      }

      if (state.type.length === 0) {
        toast.error("Debe seleccionar el rubro correspondiente");
        return;
      }

      
      console.log(state);
      const resp = await axios.post("/api/jobrequests", state);
      console.log(resp);
      if (resp) {
        toast.success("Su solicitud fue publicada exitosamente");
        router.push("/HomeEmployer/HEOffers");
      }

    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };

  

  /*INPUT ADDRESS
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
  */

  /*
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
    */

  return (
    <div className="h-screen bg-gradient-to-b from-gray-300 to-black">
      <div className="h-full bg-white/40 overflow-y-scroll h-screen max-w-md mx- overflow-y-scroll flex-grow ">
        <Layout>
          <div className="flex flex-row items-center justify-center h-screen overflow-y-hidden">
            <div className="flex flex-col text-black mr-8 w-[30rem]">
              <>
                <h1 className="text-3xl font-titleFont font-bold mb-2">
                  Encuentra una solución a
                  tu necesidad
                </h1>
                <hr />
                <ul className="list-disc mt-6">
                 
                  <li>¡Completa el siguiente formulario, a solo un click, no esperes más!</li>
                </ul>
              </>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col bg-white p-6 w-[25rem] gap-2 bg-white/70 backdrop-blur-xl rounded-lg drop-shadow-xl border-8 border-blue-500 p-8 rounded-lg bg-gray-200"
              autoComplete="off"
            >
              <h3 className="text-black font-bold">
                Generá una nueva solicitud de empleo
              </h3>

              <input
                className={`form-input ${
                  error.title ? "form-input-error" : ""
                }`}
                type="text"
                name="title"
                placeholder="Titulo del empleo"
                onChange={handleChange}
                value={state.title}
              />
              {error.title && (
                <span className="formErrorLbl">{error.title}</span>
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

              {/* <div className="form-input">
                <label htmlFor="profile-picture">
                  Adjuntar foto del trabajo
                </label>
                <input
                  className="form-control"
                  type="file"
                  accept="image/*"
                  placeholder="Puedes agregar una imagen de referencia"
                  name="profile-picture"
                  onChange={handleFileChange}
                />
              </div> */}

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
                  onClick={handleSubmit}
                  type="submit"
                  className="btn-navbar w-[6.5rem] text-center text-black font-bold border border-blue-500"
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