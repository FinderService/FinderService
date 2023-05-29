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
    <div className="bg-neutral-600 flex flex-wrap w-full mt-10">
        <div className="m-10 p-5 bg-neutral-200 w-1/4 rounded-2xl">
            <h1 className="text-2xl font-bold">👥 {users.length}</h1>
            <h1>Usuarios Totales</h1>  
        </div>
        <div className="m-10 p-5 bg-neutral-200 w-1/4 rounded-2xl">
            <h1 className="text-2xl font-bold">🛠️ {workers.length}</h1>
            <h1>Usuarios "Workers"</h1>
        </div>
        <div className="m-10 p-5 bg-neutral-200 w-1/4 rounded-2xl">
            <h1 className="text-2xl font-bold">💼 {employers.length}</h1>
            <h1>Usuarios "Employers"</h1>
        </div>
        <div className="m-10 p-5 bg-neutral-200 w-1/4 rounded-2xl">
            <h1 className="text-2xl font-bold">🟢 {validusers.length}</h1>
            <h1>Usuarios Validados</h1>

        </div>
        <div className="m-10 p-5 bg-neutral-200 w-1/4 rounded-2xl">
            <h1 className="text-2xl font-bold">🔴 {notValidusers.length}</h1>
            <h1>Usuarios sin validar</h1>
        </div>
    </div>)
}

export default ShowUsersData;