import Footer from "@components/Footer";
import Layout from "@components/Layout";
import Link from "next/link";
import Image from "next/image"

import { gas, obrero, llave, foco, manguera, tubo , ubi , equipo } from '@public/assets';
import { useEffect } from "react";
import { useUser } from "@context/UserContext";
import { useWorkers } from "@context/WorkersContext";
import { useWorker } from "@context/HomeEmployerContext";
import ShowFilters from "@components/ShowFilters";


export default function Search({ handleAction }) {
    const { workersData, getAllWorkers, sortWorkers, sortedWorkers, filtersInfo, addFilters, delFilterWorkers } = useWorker();
    const { getTypes, types } = useWorkers();

    const handlerSort = (e) => {
        const value = e.target.value;
        if(value === 'Ascendente' || value === 'Descendente' || value === 'Rating'){
            sortWorkers(e.target.value);
        }
    }

    const handleChange = (event) =>{
        addFilters(event.target.value);
    }

    useEffect(() => {
        if(workersData.length === 0){
            getAllWorkers();
        }
        if(types.length === 0){
            getTypes();
        }
        //eslint-disable-next-line
    },[workersData])
    const imgsWorks = [ gas, obrero, llave, foco, manguera, tubo , ubi , equipo ];
    const { userData } = useUser();

    return (
        <Layout>
            <div className="bg-white  flex justify-around">
                <div className="mt-14 flex flex-col w-1/5 h-fit">
                    <div className="flex flex-wrap justify-around rounded-2xl h-1/4">
                        {userData.name? imgsWorks.map((work)=>{
                            return ( 
                                <Link href="/" key={work}>
                                    <Image src={work} className="flex justify-center items-center m-4 p-3 w-14 h-fit rounded-2xl bg-neutral-200 duration-200 hover:scale-110" alt="equisde"></Image>
                                </Link>
                            )
                        }) : imgsWorks.map((work)=>{
                            return (    
                                <Image src={work} onClick={handleAction} className="flex justify-center items-center m-4 p-3 w-14 h-fit rounded-2xl bg-neutral-200 duration-200 hover:scale-110" key={work} alt="xd2"></Image>
                            )
                        })}  
                    </div>

                    <div className="bg-neutral-300 mt-10 mb-10 p-6 rounded-xl">
                        <label className="font-bold mb-2">Ordenar por:</label>
                        <div>
                            <select onChange={(e) => handlerSort(e)} name="OrderFilter" className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded focus:outline-none focus:border-gray-500">
                                <option value="Ordenar">-Ordenar-</option>
                                <option value="Cercano">Más cercanos</option>
                                <option value="Ascendente">Nombres (Ascendente)</option>
                                <option value="Descendente">Nombres (Descendente)</option>               
                            </select>
                        </div>
                        <div className="mt-5">
                            <label className="font-bold mb-2">Filtrar por:</label>                
                            <select name="Filters" onChange={(e) => handlerSort(e)} className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded focus:outline-none focus:border-gray-500">
                                <option value="Filtros">-Filtros-</option>
                                <option value="Rating">Rating</option>
                            </select>                       
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-around pt-5 mt-14 mb-6 pl-10 w-1/2 rounded-xl">
                    <div className="w-5/6 py-3 px-3 bg-slate-300/60 rounded-md flex flex-row gap-2 backdrop-blur-sm ">
                        <input type="text" placeholder="Buscar por nombre" className="bg-white/0 placeholder-gray-700 w-full text-xl border-none border-transparent outline-none "/>
                    </div>
                    <ShowFilters filterData={sortedWorkers} infoFilters={filtersInfo} deleteFilter={delFilterWorkers}/>
                    <div className="mt-5 flex flex-col flex-wrap">
                        {sortedWorkers.map((info)=>{
                            return (
                                <Link href="/WorkerDetail" key={info._id}>
                                    <div key={info._id} className="flex justify-start bg-neutral-300 p-5 mb-10 mr-5 rounded-xl duration-200 hover:scale-105">
                                        <Image src={info.profilepic} width={100} height={200} alt="pics"/>
                                        <div className="pl-10 w-full flex justify-between">
                                            <div className="flex flex-col justify-around">
                                                <p>Nombre: {info.name}</p>
                                                <p>Rol: {info.profile}</p>
                                                <p>Profesión: {info.type.map((info) => info.name).toString()}</p>                                               
                                            </div>
                                            <div className="flex flex-col justify-around items-end pr-5">
                                                <p>{info.rating} ⭐</p>
                                                <p>Edad: {info.age}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
                <div className="bg-neutral-300 flex flex-col w-1/6 h-fit mt-14 mb-10 p-6 rounded-xl">
                    <div>
                        <label className="font-bold mb-2">Métodos de Pago</label>
                        <select name="Payment" className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded focus:outline-none focus:border-gray-500">
                            <option value="Ordenar">-Formas de Pago-</option>
                            <option value="Descendente">Efectivo</option>
                            <option value="Ascendente">Mercado Pago</option>
                        </select>
                    </div>
                    <div className="mt-5">
                        <label className="font-bold mb-2">Tipos de Trabajo</label>
                        <div>
                            <select name="Works" onClick={()=> console.log(filtersInfo)} onChange={handleChange} className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded focus:outline-none focus:border-gray-500">
                                <option value="Trabajos">-Trabajo-</option>
                                {types?.map((data)=> {
                                    return (
                                    <option value={data}>{data}</option>
                                    )
                                })}
                            </select>    
                        </div>
                    </div>
                    <div className="flex justify-center bg-blue-300 mt-5 mb-5 p-1 rounded-xl">
                        {userData.name?
                            <Link href="/HomeEmployer/HEOffers">
                                <button className="font-bold mb-2">💼 Mis Ofertas</button>
                            </Link>
                        : <button onClick={handleAction} className="font-bold mb-2">💼 Mis Ofertas</button>
                        }                       
                    </div>
                </div>
            </div>
            <Footer />
        </Layout>
    )
}

