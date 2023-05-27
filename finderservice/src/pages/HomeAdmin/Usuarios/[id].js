import Layout from "@components/Layout";
import NavBarAdmin from "@components/NavBarAdmin";
import { useAdmin } from "@context/AdminContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Image from "next/image";
import { loader } from "@public/assets";
import { useSession } from "next-auth/react";

const userDetail = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const { userDetail , getUserByID, setUserDetail} = useAdmin();
    const { id } = router.query;

    useEffect(()=>{
        getUserByID(id);
        return (setUserDetail({}))
        //eslint-disable-next-line
    },[])
    
    if (session) {
        return(
         <Layout>
            <div className="flex justify-start">
                <NavBarAdmin />
                <div className="flex justify-center items-center bg-stone-800 w-full h-screen">
                    {userDetail.name? <>
                        <div className="p-10 bg-neutral-200 flex w-3/4">
                            <Image src={userDetail.profilepic} width={300} height={300} alt="userpic"/>
                            <div>
                                <div className="flex-col pl-10">
                                    <p className="font-bold text-2xl">{userDetail.name}</p>
                                    <p>Fecha de nacimiento: {userDetail.birthdate.slice(0,10)}</p>
                                    <p>Edad: {userDetail.age}</p>
                                    <p>Rating: {userDetail.rating}</p>
                                    <p>Tipo de usuario: {userDetail.profile}</p>
                                    <br/>
                                    <p className="font-bold">Contact:</p>
                                    <p>E-mail: {userDetail.email}</p>
                                    <p>Phone: {userDetail.phone}</p>
                                </div>

                                <div className="mt-10 flex-col pl-10">
                                    <p className="font-bold">Estado de cuenta:</p>
                                    <div className="flex">
                                        <p>Validación: {` `}</p>
                                        {userDetail.active? <p className="text-lime-600"> VERIFICADA</p> : <p className="text-red-600"> NO VERIFICADA</p>}
                                    </div>
                                    <div className="flex">
                                        <p>Habilitación: {` `}</p>
                                        { userDetail.deleted? <p className="text-red-600"> CUENTA INHABILITADA</p> : <p className="text-lime-600"> CUENTA HABILITADA</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </> : <>
                        <div className="flex justify-center">
                            <Image src={loader} width={600} height={300} alt="loading"/>
                        </div>
                    </>
                    }
                </div>
            </div>
        </Layout>)
    }
    return <p>Access Denied</p>; 
}

export default userDetail;