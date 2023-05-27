import SliderUsers from "@components/Admin/SliderUsers";
import Layout from "@components/Layout";
import NavBarAdmin from "@components/NavBarAdmin";
import { useAdmin } from "@context/AdminContext";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const UsersAdmin = () =>{    
    const { data: session } = useSession();
    const { users, getAllUsers , workers, employers, validusers, notValidusers } = useAdmin();
    const [ detail , setDetail ] = useState({});

    useEffect(()=>{
        if(!users.length){
            getAllUsers();    
        }  
    },[])

    const clickOnUser = (obj) =>{
        setDetail(obj);
    }

    if (session) {
        return (
        <Layout >
            <div className="flex justify-start">
                <NavBarAdmin />
                <div className="bg-stone-800 w-full">
                    <div className="flex justify-center text-white text-3xl font-bold mt-10 ml-10">Configuración de Usuarios</div>
                    <div>
                        {!detail.name? <p className="pl-20 text-white">Seleccione un usuario.</p>
                        : <>
                            <p className="font-bold mt-10 ml-20 pl-5 pt-3 pb-2 bg-stone-200 w-1/2">Informacion del Usuario</p>
                            <div className="flex ml-20 mb-10 p-5 bg-stone-200 w-1/2">
                                <Image width={100} height={100} src={detail.profilepic} alt='bigpic'/>
                                <div className="w-1/2 pl-5 flex-col">
                                    <p className="font-bold">{detail.name}</p>
                                    <p>Phone: {detail.phone}</p>
                                    <p>E-mail: {detail.email}</p>
                                </div>
                                <div className="w-full flex justify-end">
                                    <Link onClick={()=>{ console.log(detail);}} href={`/HomeAdmin/Usuarios/${detail._id}`}><button>Detalles Avanzados</button></Link>
                                </div>
                            </div>                      
                        </>}
                    </div>
                    <SliderUsers tit1="🛠️ Workers/Empleados" tit2="💼 Employers/Empleadores" users={users} workers={workers} employers={employers} clickOnUser={clickOnUser}/>
                    <SliderUsers tit1="🟢 Usuarios Validados" tit2="🔴 Usuarios no validados" users={users} workers={validusers} employers={notValidusers} clickOnUser={clickOnUser}/>
                </div>
            </div>
        </Layout>);
    }
   return <p>Access Denied</p>; 
}

export default UsersAdmin;