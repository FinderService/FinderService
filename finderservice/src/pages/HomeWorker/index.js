import Footer from "@components/Footer";
import Layout from "@components/Layout";
import { useWorkers } from "@context/WorkersContext";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { loader } from '@public/assets';

//vista de home empleado
export default function HomeWorker() {
    const { JobReqs, getJobReqs} = useWorkers();
    
    useEffect(()=>{
        if(JobReqs.length === 0){
            getJobReqs();
            console.log(JobReqs);
        }
        //eslint-disable-next-line
    },[])

  return (
    <Layout>
        <div className="bg-white  flex justify-around">
            <div className="w-1/5 h-80 p-4 mt-10">
                <div className="h-60 pt-5 flex flex-col justify-around">
                    <div className="shadow-2xl shadow-zinc-400 flex flex-col">
                        <Link href="/HomeWorker"><p className="flex items-center pl-5 h-10 bg-slate-400 font-bold hover:bg-blue-300 hover:text-slate-200">🏠 Home</p></Link>
                        <Link href="/HomeWorker/Postulations"><p className="flex items-center pl-5 h-10 bg-slate-400 font-bold hover:bg-blue-300 hover:text-slate-200">📩 Mis Postulaciones</p></Link>
                        <Link href="/contratar"><p className="flex items-center pl-5 h-10 bg-slate-400 font-bold hover:bg-blue-300 hover:text-slate-200">📢 Postear un servicio</p></Link>
                        <p className="flex items-center pl-5 h-10 bg-slate-400 font-bold hover:bg-blue-300 hover:text-slate-200">📝 Reviews</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-around pt-5 mt-14 mb-6 pl-10 w-1/2 rounded-xl">
                <div className="w-5/6 py-3 px-3 bg-slate-300/60 rounded-md flex flex-row gap-2 backdrop-blur-sm ">
                    <input type="text" placeholder="Buscar por oferta" className="bg-white/0 placeholder-gray-700 w-full text-xl border-none border-transparent outline-none "/>
                </div>
                {JobReqs.length? 
                    <>
                        <div className="font-bold mb-2 mt-5">{JobReqs.length} resultados encontrados</div>
                        <div className="mt-5 flex flex-col flex-wrap">
                            {JobReqs.map((job)=>{
                                return (
                                <Link href={`/HomeWorker/${job._id}`} key={waos2}>
                                    <div key={job._id} onClick={() => getJobReqs(job._id)} className="flex bg-neutral-300 p-5 mb-10 mr-5 duration-200 hover:scale-105 hover:shadow-xl">
                                        <Image className="mr-7 w-30 h-20 rounded-2xl" src={job.photo} width={75} height={75} alt="imgjob" />
                                        <div className="flex justify-between w-4/5">
                                            <div className="flex flex-col justify-around">
                                                <h2 className="font-bold">{job.name}</h2>
                                                <p>Trabajo para: { job.type.map((tipo)=> tipo.name)}</p>
                                            </div>
                                            <div className="flex flex-col justify-around items-end">
                                                <p>Ubicación: {job.address}</p>
                                                <p>Fecha: {job.date}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>)
                            })}
                        </div>
                    </> : <div className="flex justify-center pr-20">
                        <Image src={loader} width={400} height={200} alt="loading"/>
                    </div>
                }
            </div>
            <div className="bg-neutral-300 flex flex-col w-1/6 h-fit mt-14 mb-10 p-6 rounded-xl">
                <div>
                    <label className="font-bold mb-2">Tus Postulaciones</label>
                    <select name="Payment" className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded focus:outline-none focus:border-gray-500">
                        <option value="Ordenar">-Detalle-</option>
                    </select>
                </div>
            </div>
        </div>
    <Footer/>
    </Layout>  
    )
}
