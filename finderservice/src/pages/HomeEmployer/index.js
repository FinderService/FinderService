import Footer from "@components/Footer";
import Layout from "@components/Layout";
import Link from "next/link";
import Image from "next/image"
import { loader } from '@public/assets';

import { useEffect } from "react";
import { useUser } from "@context/UserContext";
import { useWorkers } from "@context/WorkersContext";
import { useWorker } from "@context/HomeEmployerContext";
import ShowFilters from "@components/ShowFilters";
import showImgs from "@/utils/showImgs";


export default function Search({ handleAction }) {
    const objImgs = showImgs();
    const { userData } = useUser();
    const { workersData, getAllWorkers, sortWorkers, sortedWorkers, filtersInfo, addFilters, delFilterWorkers } = useWorker();
    const { getTypes, types } = useWorkers();
    
    //const objImgs = types? showImgs(types) : null;

    const handlerSort = (e) => {
        sortWorkers(e.target.value);      
    }

    const handleChange = (event) =>{
         const value = event.target.value;
        addFilters(value);
    }

    const handleImgChange = (value) =>{
       addFilters(value);
   }

    useEffect(() => {
        const fetchData = async () => {
            if (workersData.length === 0) {
                await getAllWorkers();
                await getTypes();
            }
        };
        fetchData();
        //eslint-disable-next-line
    },[])

    return (
        <Layout>
            {!workersData.length && (!types.length)? 
            <>
                <div className="flex justify-center pr-20">
                    <Image src={loader} width={400} height={200} alt="loading" priority={true}/>
                </div>
            </>
            :<>
            <div className="bg-white  flex justify-around">
                <div className="mt-14 flex flex-col w-1/5 h-fit">
                    <div className="flex flex-wrap justify-around rounded-2xl h-1/4">
                        {objImgs.map((obj)=>{
                            return ( 
                                <Image src={obj.img} key={obj.work} onClick={()=> handleImgChange(obj.work)} className="flex justify-center items-center m-4 p-3 w-14 h-fit rounded-2xl bg-neutral-200 duration-200 hover:scale-110 hover:cursor-pointer" alt={obj.work}></Image>
                            )})
                        }
                    </div>

                    <div className="bg-neutral-300 mt-10 mb-10 p-6 rounded-xl">
                        <label className="font-bold mb-2">Ordenar por:</label>
                        <div>
                            <select onChange={(e) => handlerSort(e)} name="OrderFilter" className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded focus:outline-none focus:border-gray-500">
                                <option value="Ordenar">-Ordenar-</option>
                                <option value="Cercano">Más cercanos</option>
                                <option value="Ascendente">Nombres &lpar;Ascendente&rpar;</option>
                                <option value="Descendente">Nombres &lpar;Descendente&rpar;</option>   
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
                                        <Image key={info._id} src={info.profilepic} width={100} height={200} alt="pics"/>
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
                <div className="bg-neutral-300 flex flex-col w-1/6 h-fit mt-14 mb-5 pl-6 pt-6 pr-6 rounded-xl">
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
                            <select name="Works" onChange={handleChange} className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded focus:outline-none focus:border-gray-500">
                                <option value="Trabajos">-Trabajo-</option>
                                {types.map((data)=> {
                                    return (
                                    <option key={data} value={data}>{data}</option>
                                    )
                                })}
                            </select>    
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <Link key="a" href="/HomeEmployer/HEOffers">
                            <div className="flex justify-center bg-blue-300 mt-5 mb-5 pt-2 pb-2 pl-5 pr-5 rounded-xl hover:bg-blue-500">
                                {userData.name?                                
                                    <button className="font-bold">💼 Mis Ofertas</button>                               
                                : <button onClick={handleAction} className="font-bold">💼 Mis Ofertas</button>
                                }                       
                            </div>
                        </Link>
                    </div>                  
                </div>
                
            </div></>}
            <Footer />
        </Layout>
    )
}