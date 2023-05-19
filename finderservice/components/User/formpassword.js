import { validatePassword } from "@/utils/validators";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function FormPassword() {

  const { data: session } = useSession();
  console.log(session);

  const [state, setState] = useState({
    current: "",
    newpass: "",
    renew: "",
    email: "",
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let res = await axios.post('/api/auth/password', state);

  }

  useEffect(() => {
    if(session){
        setState({
            ...state,
            mail: session.user?.email
        })
    }
},[session]);

  return (
    <>
      <form className="flex flex-col gap-2" onSubmit={ handleSubmit}>
        <input type="text" name="email" vlaue={ state.email } />
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
          placeholder="Contraseña actual"
          className="form-input"
          value={state.newpass}
          onChange={handleChange}
        />
        <input
          type="password"
          name="renew"
          placeholder="Contraseña actual"
          className="form-input"
          value={state.renew}
          onChange={handleChange}
        />
        <button type="submit">Enviar</button>
      </form>
    </>
  );
}
