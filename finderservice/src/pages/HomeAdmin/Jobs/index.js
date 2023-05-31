import Layout from "@components/Layout";
import NavBarAdmin from "@components/NavBarAdmin";
import Image from "next/image";
import Link from "next/link";

import { loader } from '@public/assets';

import { useSession } from "next-auth/react";
import { useAdmin } from "@context/AdminContext";
import { useEffect } from "react";

const AdminJobs = () => {
    const { data: session } = useSession();
    const {jobReqs, getAllJobReqs, jobDetails, setJobDetails} = useAdmin();

    useEffect(()=>{
        const fetchData = async () => {
            try {
                if(!jobReqs.length){
                    await getAllJobReqs();
                }
            } catch (error) {
                console.error('Error en la solicitud Axios:', error);
            }
        };
        fetchData();
    //eslint-disable-next-line
    },[])

    const clickOnUser = (obj) =>{
        setJobDetails(obj);
    }

    if(session){
        return (<>
            <Layout>
            <div className="flex justify-start">
                <NavBarAdmin /> 
                {!jobReqs.length? <>
                    <div className="flex justify-center items-center bg-white w-full h-screen">
                        <div className="flex justify-center">
                            <Image src={loader} width={600} height={300} alt="loading"/>
                        </div>
                    </div>
                </>:<>
                    <div className="bg-stone-800 w-full">
                        <div className="flex justify-center text-white text-3xl font-bold mt-10 ml-10">Configuración de Trabajos</div>
                        <div>
                            {!jobDetails.title? <>
                                <p className="pt-10 pb-10 pl-40 text-white">Selecciona una propuesta de trabajo.</p>
                            </> :<>
                                <p className="font-bold mt-10 ml-60 pt-5 pb-2 pl-10 bg-stone-200 w-3/5">Informacion del Trabajo</p>
                                <div onClick={()=> console.log(jobDetails)} className="flex ml-60 mb-10 p-5 bg-stone-200 w-3/5">
                                    <div className=" pl-5 flex-col">
                                        <p className="mb-3 text-xl font-bold">{jobDetails.title}</p>
                                        <p className="mb-1">Destinado para: {jobDetails.type[0].name}</p>
                                        <p className="mb-1">Description: {jobDetails.description}</p>
                                        <p className="mb-1">Fecha de publicacion: {jobDetails.date.slice(0,10)}</p>
                                    </div>
                                    <div className="w-3/5 h-1/2 flex justify-end ">
                                        <Link href={`/HomeAdmin/Jobs/${jobDetails._id}`}><button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Detalles Avanzados</button></Link>
                                    </div>
                                </div> 
                            </>}                           
                        </div>                       
                        <div className="mt-10 mb-10 flex justify-around">
                            <div className="bg-yellow-100 rounded-xl p-5 w-3/4 flex flex-col">
                                <p className="text-xl font-bold mb-5">🗂️ Propuestas de Trabajo creadas:</p>
                                <div className="bg-slate-100 max-h-96 overflow-y-auto">
                                    {jobReqs.map((item,index)=>{
                                        return(<>
                                        <div onClick={()=> clickOnUser(item)} className="pl-5 pb-2 pt-2 mt-3 mb-3 flex hover:bg-blue-500 hover:cursor-pointer" key={index}>
                                            <div className="pl-5 flex-col">
                                                <p className="font-bold">Titulo: {item.title}</p>
                                                <p>Publicado por: {item.employer[0].name}</p>
                                                <p>Fecha de publicacion: {item.date.slice(0,10)}</p> 
                                                <p>Destinado para: {item.type[0].name}</p>
                                            </div>
                                        </div>
                                        </>)}                                   
                                    )}
                                </div>    
                            </div>
                        </div>
                    </div>               
                </>}
            </div>
            </Layout>
        </>)
    }
    return <p>Access Denied</p>; 
}

export default AdminJobs;