import { useState } from "react"

export default function FormData({ name, email, birthdate, phone }) {

    const[state, setState] = useState({
        name,
        email,
        birthdate,
        phone
    })

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    return(
        <div className="flex flex-col gap-2 bg-slate-100 rounded-md p-4 mr-4">
            <h3 className="text-xl">Datos de la cuenta:</h3>
            <input type="text" name="name" value={state.name} onChange={handleChange} className="form-input" />
            <input type="text" name="email" value={state.email} onChange={handleChange} className="form-input" readOnly />
            <input type="date" name="birth" value={state.birthdate} onChange={handleChange} className="form-input" />
            <input type="text" name="phone" value={state.phone} onChange={handleChange} className="form-input" />
        </div>
    )
}