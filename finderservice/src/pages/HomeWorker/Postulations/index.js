import Footer from "@components/Footer";
import Layout from "@components/Layout";
import { useWorkers } from "@context/WorkersContext";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { loader } from "@public/assets";
import { useUser } from "@context/UserContext";

const MyPostulations = () =>{
    const [ postDetails , setPostDetails ] = useState({});
    const { userData } = useUser();
    const { myPostulations, getMyPostulations } = useWorkers();

    useEffect(()=>{
        const fetchData = async () => {
            if (myPostulations.length === 0 && userData._id) {
                await getMyPostulations(userData._id);
            }
        }
        fetchData();
        //eslint-disable-next-line
    },[])

    return(
        <Layout>
            {(myPostulations.length === 0)?
            <>
                <div className="flex justify-center pr-20">
                    <Image src={loader} width={400} height={200} alt="loading" priority={true}/>
                </div>
            </>:<>
                <div className="flex justify-around">
                    <div className="w-1/5 h-80 p-4 mt-10">
                        <div className="h-60 pt-5 flex flex-col justify-around">
                            <div className="shadow-2xl shadow-zinc-400 flex flex-col">
                                <Link href="/HomeWorker"><p className="flex items-center pl-5 h-10 bg-slate-400 font-bold hover:bg-blue-500 hover:text-slate-200">🏠 Home</p></Link>
                                <Link href="/HomeWorker/Postulations"><p className="flex items-center pl-5 h-10 bg-slate-400 font-bold hover:bg-blue-500 hover:text-slate-200">📩 Mis Postulaciones</p></Link>
                                <Link href="/Reviews"><p className="flex items-center pl-5 h-10 bg-slate-400 font-bold hover:bg-blue-500 hover:text-slate-200">📝 Mis Reviews</p></Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-around w-1/2 mt-10 mb-5">
                        <h1 className="text-4xl font-bold">📩 Mis postulaciones a Empleos</h1>
                        <p className="pt-5 pb-3 font-bold">4 postulaciones aplicadas a trabajos</p>
                        <div className="flex flex-col justify-around">
                            {myPostulations.map((item)=>{
                                return(<>
                                    <div key={item.salary} className="flex justify-between bg-neutral-300 p-7 mt-5 rounded-xl duration-200 hover:scale-105">
                                        <div>
                                            <p>ESTADO: Pendiente</p>
                                            <p>Título del trabajo: Reparación de ...</p>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <p>Postulados: 324</p>
                                            <p>Título del trabajo: Obrero, Gasista</p>
                                        </div>
                                    </div>
                                </>)
                            })
                            }
                        </div>   
                    </div>
                    <div className="bg-neutral-300 w-1/4 h-fit mt-10 mb-10 p-8 rounded-2xl">
                        <h1 className="text-2xl mb-5 font-bold">Información del Empleo</h1>
                        <h1 className="text-xl mb-2">Título del empleo</h1>
                        <p className="mb-2"> Descripcion </p>
                        <p className="mb-2">Empleo destinado para: Gasista</p>
                        <p className="mb-6">Total de postulados: 777</p>
                        <div className="flex justify-around">
                            <Link href="/HomeWorker/Postulations/Detail">
                                <button className="bg-slate-400 font-bold hover:bg-blue-500 hover:text-slate-200 py-2 px-4 rounded">Ver información detallada</button>
                            </Link>
                        </div>                   
                    </div>
                </div> 
            </>}
        <Footer />
        </Layout>
    )
}

export default MyPostulations;