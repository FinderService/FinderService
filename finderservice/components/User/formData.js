import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function FormData({ name, email, birthdate, phone, address }) {
  const [state, setState] = useState({
    name,
    email,
    birthdate,
    phone,
    address,
  });

  const handleChange = (e) => {
    if (e.target.name === "addressname") {
      setState({
        ...state,
        address: [
          {
            ...state.address[0],
            addressname: e.target.value,
          },
        ],
      });
    } else if (e.target.name === "country") {
      setState({
        ...state,
        address: [
          {
            ...state.address[0],
            country: e.target.value,
          },
        ],
      });
    } else if (e.target.name === "state") {
      setState({
        ...state,
        address: [
          {
            ...state.address[0],
            state: e.target.value,
          },
        ],
      });
    } else if (e.target.name === "city") {
      setState({
        ...state,
        address: [
          {
            ...state.address[0],
            city: e.target.value,
          },
        ],
      });
    } else if (e.target.name === "street") {
      setState({
        ...state,
        address: [
          {
            ...state.address[0],
            street: e.target.value,
          },
        ],
      });
    } else if (e.target.name === "zipCode") {
      setState({
        ...state,
        address: [
          {
            ...state.address[0],
            zipCode: e.target.value,
          },
        ],
      });
    } else {
      setState({
        ...state,
        [e.target.name]: e.target.value,
      });
    }
    console.log(state)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(state);
      if (
        !state.birthdate ||
        !state.email ||
        !state.name ||
        !state.phone ||
        !state.address[0].addressname ||
        !state.address[0].country ||
        !state.address[0].city ||
        !state.address[0].street ||
        !state.address[0].zipCode ||
        !state.address[0].state
      ) {
        toast.error("Todos los campos son obligatorios");
        return;
      }
      console.log(state);
      const resp = await axios.put("/api/updateUser/data",state);
      console.log(resp);
      toast.success(resp.data.msg);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div className="flex flex-col gap-2 rounded-md p-4">
      <h3 className="text-xl">Datos de la cuenta:</h3>

      <div className="p-2 border-2 border-yellow-600 bg-yellow-200 rounded-md text-yellow-700">
        <span className="font-semibold">ATENCION:</span> Los cambios se veran
        relfejados en el proximo inicio de sesion.
      </div>

      <input
        type="text"
        name="name"
        value={state.name}
        onChange={handleChange}
        className="form-input"
      />
      <input
        type="text"
        name="email"
        value={state.email}
        onChange={handleChange}
        className="form-input"
        readOnly
      />
      <input
        type="text"
        name="birth"
        value={state.birthdate}
        onChange={handleChange}
        className="form-input"
        readOnly
      />
      <input
        type="text"
        name="phone"
        value={state.phone}
        onChange={handleChange}
        className="form-input"
      />
      <h3 className="text-xl">Dirección:</h3>
      <input
        type="text"
        name="addressname"
        value={state.address[0].addressname}
        onChange={handleChange}
        className="form-input"
      />
      <input
        type="text"
        name="country"
        value={state.address[0].country}
        onChange={handleChange}
        className="form-input"
      />
      <input
        type="text"
        name="state"
        value={state.address[0].state}
        onChange={handleChange}
        className="form-input"
      />
      <input
        type="text"
        name="city"
        value={state.address[0].city}
        onChange={handleChange}
        className="form-input"
      />
      <input
        type="text"
        name="street"
        value={state.address[0].street}
        onChange={handleChange}
        className="form-input"
      />

      <input
        type="text"
        name="zipCode"
        value={state.address[0].zipCode}
        onChange={handleChange}
        className="form-input"
      />

      <button type="submit" onClick={handleSubmit}>
        Cambiar datos
      </button>
    </div>
  );
}
