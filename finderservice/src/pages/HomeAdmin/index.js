import ShowUsersData from "@components/Admin/ShowUsersData";
import Layout from "@components/Layout";
import NavBarAdmin from "@components/NavBarAdmin";
import { useAdmin } from "@context/AdminContext";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

const HomeAdmin = () =>{    
    const { data: session } = useSession();
    const { users, getAllUsers , workers, employers, validusers, notValidusers } = useAdmin();

    useEffect(()=>{
        const fetchData = async () => {
            try {
                if(!users.length){
                    await getAllUsers();
                }
            } catch (error) {
                // Manejar el error de Axios aquí
                console.error('Error en la solicitud Axios:', error);
            }
        };
        fetchData();
    //eslint-disable-next-line
    },[])

    if (session) {     
        return (
        <Layout >
            <div className="flex justify-start">
                <NavBarAdmin />
                <div className="bg-stone-800 w-full h-screen">
                    <ShowUsersData users={users} workers={workers} employers={employers} validusers={validusers} notValidusers={notValidusers}/>
                </div>
            </div>
        </Layout>);
    }
return <p>Access Denied</p>; 
}

export default HomeAdmin;