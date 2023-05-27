import SliderUsers from "@components/Admin/SliderUsers";
import Layout from "@components/Layout";
import NavBarAdmin from "@components/NavBarAdmin";
import { useAdmin } from "@context/AdminContext";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";

const UsersAdmin = () =>{    
    const { data: session } = useSession();
    const { users, getAllUsers , workers, employers } = useAdmin();
    const [ detail , setDetail ] = useState({});

    useEffect(()=>{
        if(!users.length){
            getAllUsers();    
        }  
    },[])

    const clickOnUser = (obj) =>{
        setDetail(obj);
    }
    console.log(detail);
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
                                <div className="pl-5 flex-col">
                                    <p>{detail.name}</p>
                                    <p>{detail.phone}</p>
                                    <p>{detail.email}</p>
                                </div>
                            </div>                      
                        </>}
                    </div>
                    <SliderUsers users={users} workers={workers} employers={employers} clickOnUser={clickOnUser}/>
                </div>
            </div>
        </Layout>);
    }
   return <p>Access Denied</p>; 
}

export default UsersAdmin;