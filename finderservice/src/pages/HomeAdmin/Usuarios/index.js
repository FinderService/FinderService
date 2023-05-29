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
    const { users, getAllUsers , userDetail , setUserDetail , workers, employers, validusers, notValidusers } = useAdmin();

    useEffect(()=>{
        const fetchData = async () => {
            try {
                if(!users.length){
                    await getAllUsers();
                }
            } catch (error) {
                console.error('Error en la solicitud Axios:', error);
            }
        };
        fetchData();
    //eslint-disable-next-line
    },[])

    const clickOnUser = (obj) =>{
        setUserDetail(obj);
    }

    if (session) {
        return (
        <Layout >
            <div className="flex justify-start">
                <NavBarAdmin />
                <div className="bg-stone-800 w-full">
                    <div className="flex justify-center text-white text-3xl font-bold mt-10 ml-10">Configuración de Usuarios</div>
                    <div>
                        {!userDetail.name? <p className="pl-20 text-white">Seleccione un usuario.</p>
                        : <>
                            <p className="font-bold mt-10 ml-20 pl-5 pt-3 pb-2 bg-stone-200 w-3/5">Informacion del Usuario</p>
                            <div className="flex ml-20 mb-10 p-5 bg-stone-200 w-3/5">
                                <Image width={100} height={100} src={userDetail.profilepic} alt='bigpic'/>
                                <div className="w-1/2 pl-5 flex-col">
                                    <p className="font-bold">{userDetail.name}</p>
                                    <p>Phone: {userDetail.phone}</p>
                                    <p>E-mail: {userDetail.email}</p>
                                </div>
                                <div className="w-full flex justify-end ">
                                    <Link href={`/HomeAdmin/Usuarios/${userDetail._id}`}><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Detalles Avanzados</button></Link>
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