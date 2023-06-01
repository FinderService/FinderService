import { validatePassword } from "@/utils/validators";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

import { useUser } from "@context/UserContext";
import { toast } from "react-hot-toast";

export default function FormPassword({ id }) {
  const { data: session } = useSession();
  //console.log(session);
  const { userData } = useUser();

  const [state, setState] = useState({
    current: "",
    newpass: "",
    renew: "",
    email: "",
    userid: id,
  });

  const [error, setError ] = useState({
    current: "",
    newpass: "",
    renew: "",
  });

  const handleChange = (e) => {

    let err = validatePassword(e.target.value);

    if( e.target.name === 'renew' && e.target.value !== state.newpass ){
      err = 'Las contraseñas no coinciden';
    }

    setError({
      ...error,
      [e.target.name]: err
    })

    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if( error.newpass || error.current || error.renew ){
      return;
    }

    if( !state.current || !state.newpass || !state.renew || !state.email){
      toast.error('Todos los campos son obligatorios');
      return;
    }

    console.log(state);
    try {
      let res = await axios.put("/api/updateUser/password", state);
      console.log(res);
    } catch (error) {
      //console.log(error.response.data);
      console.log(error);
    }
  };

  useEffect(() => {
    if (session) {
      setState({
        ...state,
        email: session.user?.email,
      });
    }
    //eslint-disable-next-line
  }, [session]);

  return (
    <div className="rounded-md">
      <h3 className="text-xl p-4 bg-slate-100 text-slate-700">Actualizar Contraseña:</h3>
      <form className="flex flex-col gap-2 p-4" onSubmit={handleSubmit}>
        <input type="hidden" name="id" vlaue="" />
        <input
          type="password"
          name="current"
          placeholder="Contraseña actual"
          className="form-input"
          value={state.current}
          onChange={handleChange}
        />
        { error.current && <p className="formErrorLbl">{error.current}</p>}
        <input
          type="password"
          name="newpass"
          placeholder="Nueva contraseña"
          className="form-input"
          value={state.newpass}
          onChange={handleChange}
        />
        { error.newpass && <p className="formErrorLbl">{error.newpass}</p>}
        <input
          type="password"
          name="renew"
          placeholder="Repetir nueva contraseña"
          className="form-input"
          value={state.renew}
          onChange={handleChange}
        />
        { error.renew && <p className="formErrorLbl">{error.renew}</p>}
        <div className="flex flex-row justify-end pt-2">
          <button type="submit" className="btn-navbar">Enviar</button>
        </div>
      </form>
    </div>
  );
}