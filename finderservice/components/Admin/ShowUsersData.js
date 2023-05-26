import { useAdmin } from "@context/AdminContext";
import { useEffect } from "react";

const ShowUsersData = ({ users, workers, employers, validusers, notValidusers }) =>{
    const { setUsersInfo } = useAdmin();
    useEffect(()=>{
        if(users.length){
            setUsersInfo();
        }
    },[users])
    return(
    <div className="flex flex-wrap w-3/4 mt-10 flex justify-around">
        <div className="p-5 bg-neutral-200 w-1/6 rounded-2xl">
            <h1>👥 Usuarios Totales</h1>
            <h1>{users.length}</h1>
        </div>
        <div className="p-5 bg-neutral-200 w-1/6 rounded-2xl">
            <h1>🛠️ Usuarios "Workers"</h1>
            <h1>{workers.length}</h1>
        </div>
        <div className="p-5 bg-neutral-200 w-1/6 rounded-2xl">
            <h1>💼 Usuarios "Employers"</h1>
            <h1>{employers.length}</h1>
        </div>
        <div className="p-5 bg-neutral-200 w-1/6 rounded-2xl">
            <h1>🟢 Usuarios Validados</h1>
            <h1>{validusers.length}</h1>
        </div>
        <div className="p-5 bg-neutral-200 w-1/6 rounded-2xl">
            <h1>🔴 Usuarios sin validar</h1>
            <h1>{notValidusers.length}</h1>
        </div>
    </div>)
}

export default ShowUsersData;