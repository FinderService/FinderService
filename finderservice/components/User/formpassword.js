import { validatePassword } from "@/utils/validators";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

import { useUser } from "@context/UserContext";

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

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      let res = await axios.post("/api/auth/password", state);
      console.log(res);
    }catch(error){
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
  }, [session]);

  return (
    <div className="p-4 bg-slate-100 rounded-md">
      <h3 className="text-xl">Actualizar Contraseña:</h3>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <input type="hidden" name="id" vlaue="" />
        <input
          type="password"
          name="current"
          placeholder="Contraseña actual"
          className="form-input"
          value={state.current}
          onChange={handleChange}
        />
        <input
          type="password"
          name="newpass"
          placeholder="Nueva contraseña"
          className="form-input"
          value={state.newpass}
          onChange={handleChange}
        />
        <input
          type="password"
          name="renew"
          placeholder="Repetir nueva contraseña"
          className="form-input"
          value={state.renew}
          onChange={handleChange}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
