import Footer from "@components/Footer";
import Layout from "@components/Layout";

import { useWorkers } from "@context/WorkersContext";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { loader } from '@public/assets';
import ShowFilters from "@components/ShowFilters";
import { GoStar } from "react-icons/go";


//vista de home empleado
export default function HomeWorkers() {
    const { JobReqs, getJobReqs, filterData, infoFilters, jobFilters, delFilter, getTypes, types } = useWorkers();

    useEffect(()=>{
        const fetchData = async () => {
            try {
                if (JobReqs.length === 0) {
                    await getJobReqs();;
                    await getTypes();
                }
            } catch (error) {
                console.error('Error en la solicitud Axios:', error);
            }
        };
        fetchData();
        //eslint-disable-next-line
    },[])

    const handleFilters = (event) =>{
        jobFilters(event.target.value)
    }

    const deleteFilter = () =>{
        delFilter();
    }

  return (
    <Layout>
        {(!filterData.length) && (types.length === 0)?
        <>
        <div className="flex justify-center pr-20">
            <Image src={loader} width={400} height={200} alt="loading" priority={true}/>
        </div>
        </>:<>
            <div className="bg-white flex justify-around">                      
                <div className="w-1/5 h-80 p-4 mt-10">
                    <div className="h-60 pt-5 flex flex-col justify-around">
                        <div className="shadow-2xl shadow-zinc-400 flex flex-col">
                            <Link href="/HomeWorker"><p className="flex items-center pl-5 h-10 bg-slate-400 font-bold hover:bg-blue-500 hover:text-slate-200">🏠 Home</p></Link>
                            <Link href="/HomeWorker/Postulations"><p className="flex items-center pl-5 h-10 bg-slate-400 font-bold hover:bg-blue-500 hover:text-slate-200">📩 Mis Postulaciones</p></Link>
                            <p className="flex items-center pl-5 h-10 bg-slate-400 font-bold hover:bg-blue-500 hover:text-slate-200"><Link href="/MyReviewsWorker">⭐ Mis Reviews</Link></p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-around pt-5 mt-14 mb-6 pl-10 w-1/2 rounded-xl">
                    <div className="w-5/6 py-3 px-3 bg-slate-300/60 rounded-md flex flex-row gap-2 backdrop-blur-sm ">
                        <input type="text" placeholder="Buscar por oferta" className="bg-white/0 placeholder-gray-700 w-full text-xl border-none border-transparent outline-none "/>
                    </div>
                    {(filterData.length)?
                        <>
                            <ShowFilters filterData={filterData} infoFilters={infoFilters} deleteFilter={deleteFilter}/>
                            <div className="mt-5 flex flex-col flex-wrap">
                                {filterData.map((job)=>{
                                    return (
                                    <Link onClick={()=> console.log(job) } href={`/HomeWorker/${job._id}`} key={job._id}>
                                        <div key={job._id} className="shadow-xl flex justify-start bg-neutral-300 p-5 pl-10 mb-10 mr-5 duration-200 hover:scale-105 hover:shadow-xl">
                                            <div className="flex justify-between w-full">
                                                <div className="flex flex-col justify-around w-1/2">
                                                    <h2 className="font-bold text-xl">{job.title? job.title : job.name}</h2>
                                                    <p>Trabajo para: { job.type.map((tipo)=> tipo.name)}</p>
                                                    <p>Ubicación: {job.address.length? `${job.address[0].city} - ${job.address[0].country}` : " - "}</p>
                                                    <p>Fecha: {job.date.slice(0,10)}</p>
                                                </div>
                                                <div className="flex flex-col justify-around items-end w-1/3">
                                                    <p className="text-black font-bold"><Link href="/ReviewsEmployer">Calificar<GoStar className="text-3xl text-blue-500 mx-auto text-center"/></Link></p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>)
                                })}
                            </div>
                        </>:<>
                            <ShowFilters filterData={filterData} infoFilters={infoFilters} deleteFilter={deleteFilter}/>
                            <p>Por el momento no hay empleos con tales filtros aplicados.</p>
                        </>
                    }
                </div>
                <div className="shadow-xl bg-neutral-300 flex flex-col w-1/6 h-fit mt-14 mb-10 p-6 rounded-xl">
                    <div>
                        <label className="font-bold mb-2">Filtrar por:</label>                
                        <select name="Jobs" onChange={handleFilters} className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded focus:outline-none focus:border-gray-500">
                            <option value="Trabajos">-Trabajos-</option>
                            {types.map((type) => {
                                return (<option key={type} value={type}>{type}</option>)
                            })}
                        </select>  
                    </div>
                </div>
            </div></>
        }
    <Footer/>
    </Layout>  
    )
}
