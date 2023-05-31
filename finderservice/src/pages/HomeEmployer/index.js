import Footer from "@components/Footer";
import Layout from "@components/Layout";
import Link from "next/link";
import Image from "next/image"
import { loader } from '@public/assets';
import { GoStar } from "react-icons/go";
import { useEffect, useState } from "react";
import { useUser } from "@context/UserContext";
import { useWorkers } from "@context/WorkersContext";
import { useWorker } from "@context/HomeEmployerContext";
import ShowFilters from "@components/ShowFilters";
import showImgs from "@/utils/showImgs";
import { avt } from "@public/assets";

export default function Search({ handleAction }) {
    const objImgs = showImgs();
    const { userData } = useUser();
    const { workersData, getAllWorkers, sortWorkers, setSortedWorkers, sortedWorkers, filtersInfo, addFilters, delFilterWorkers, getWorkerByName } = useWorker();
    const { getTypes, types } = useWorkers();
    const [ error, setError ] = useState("")
    const [wait, setWait] = useState(false);

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

   const resetWorkersData = () =>{
        setSortedWorkers(workersData);
   }

    const searchWorker = async (event) =>{
        const enter = event.key;
        const name = event.target.value;
        if(enter === 'Enter'){
            console.log("ENTER");
            setWait(true);
            const errorExist = await getWorkerByName(name);
            if(errorExist){
                alert(errorExist.response.data.error);
                setWait(false);
                return;
            }
            setWait(false);
            console.log("ENTER");
        }
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
                                <Image src={obj.img} key={obj.work} onClick={()=> handleImgChange(obj.work)} className="shadow-xl flex justify-center items-center m-4 p-3 w-16 h-fit rounded-2xl bg-neutral-200 duration-200 hover:scale-110 hover:cursor-pointer" alt={obj.work}></Image>
                            )})
                        }
                    </div>

                    <div className="shadow-2xl bg-neutral-300 mt-10 mb-10 p-6 rounded-xl">
                        <label className="font-bold mb-2">Ordenar por:</label>
                        <div>
                            <select onChange={(e) => handlerSort(e)} name="OrderFilter" className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded focus:outline-none focus:border-gray-500">
                                <option value="Ordenar">-Ordenar-</option>
                                <option value="Ascendente">Nombres (Ascendente) </option>
                                <option value="Descendente">Nombres (Descendente)</option>   
                                <option value="Rating">Rating</option>            
                            </select>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-around pt-5 mt-14 mb-6 pl-10 w-1/2 rounded-xl">
                    <div className="flex">
                        <div className="w-4/6 py-3 px-3 bg-slate-300/60 rounded-md flex flex-row gap-2 backdrop-blur-sm ">
                            <input onKeyDown={searchWorker} type="text" placeholder="Enter para buscar por nombre" className="bg-white/0 placeholder-gray-700 w-full text-xl border-none border-transparent outline-none "/>
                        </div>
                        <button onClick={resetWorkersData} className="w-1/6 ml-3 text-sm bg-blue-500 hover:bg-blue-600 text-white font-bold rounded">Todos los Trabajadores</button>
                    </div>
                    <ShowFilters filterData={sortedWorkers} infoFilters={filtersInfo} deleteFilter={delFilterWorkers}/>
                    <div className="mt-5 flex flex-col flex-wrap">
                        {sortedWorkers.map((info)=>{
                            return (
                                <Link href="/WorkerDetail" key={info._id}>
                                    <div key={info._id} className="shadow-xl flex justify-start bg-neutral-300 p-5 mb-10 mr-5 rounded-xl duration-200 hover:scale-105">
                                        {info.profilepic.length? <Image key={info._id} width={100} height={200} src={info.profilepic} alt='bigpic'/>
                                        : <Image key={info._id} width={100} height={200} src={avt} alt='userpic'/>
                                        }
                                        <div className="pl-10 w-full flex justify-between">
                                            <div className="flex flex-col justify-around">
                                                <p className="text-xl font-bold">{info.name}</p>
                                                <p>Rol: {info.profile}</p>
                                                <p>Profesión: {info.type.map((info) => info.name).toString()}</p>       
                                                <p>Edad: {info.age}</p>                                        
                                            </div>
                                            <div className="flex flex-col justify-around items-end pr-5">
                                                <div className="flex">
                                                    <p className="pr-2 text-black font-bold">{info.rating}</p>
                                                    <GoStar className="text-3xl text-blue-500 mx-auto text-center"/>                                 
                                                </div>
                                                <Link href="/ReviewsEmployer"><button className="bg-blue-500 hover:bg-blue-600 text-white font-bold p-1 rounded">Puntuar</button></Link>                                                
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                        {wait && (<>
                            <div dialogClassName="avatar-modal" className="w-full h-screen absolute top-0 left-0 bg-black/50 z-40 flex flex-col items-center justify-center">
                                <div className="bg-white w-[40rem] pl-10 pr-10 pt-5 rounded-md flex flex-col items-center overflow-hidden shadow-2xl">
                                    <Image src={loader} width={300} height={150} alt="loading"/>
                                    </div>
                            </div>
                        </>)}                      
                    </div>
                </div>
                <div className="bg-neutral-300 shadow-2xl flex flex-col w-1/6 h-fit mt-14 mb-5 pl-6 pt-6 pr-6 rounded-xl">

                    <div className="mt-3">
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