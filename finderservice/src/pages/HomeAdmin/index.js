import ShowUsersData from "@components/Admin/ShowUsersData";
import Layout from "@components/Layout";
import NavBarAdmin from "@components/NavBarAdmin";
import { useAdmin } from "@context/AdminContext";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect } from "react";
import { loader } from '@public/assets';
import { useRouter } from "next/router";

const HomeAdmin = () =>{    
    const router = useRouter();
    const { data: session } = useSession();
    const { users, getAllUsers , workers, employers, validusers, notValidusers, removedUsers } = useAdmin();

    useEffect(()=>{
        if(session && session.user?.email !== 'adminfs@gmail.com'){
            router.push('/');
        }

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
    },[session])

    if (session) {     
        return (
        <Layout >
            {!users.length? <>
                    <div className="flex justify-center pr-20">
                        <Image src={loader} width={400} height={200} alt="loading" priority={true}/>
                    </div>
            </>:<>
                <div className="flex justify-start">
                    <NavBarAdmin />
                    <div className="bg-stone-800 w-full h-screen">
                        <ShowUsersData users={users} workers={workers} employers={employers} validusers={validusers} notValidusers={notValidusers} removedUsers={removedUsers}/>
                    </div>          
                </div>
            </>}        
        </Layout>);
    }
return <p>Access Denied</p>; 
}

export default HomeAdmin;