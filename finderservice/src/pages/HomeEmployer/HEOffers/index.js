import Footer from "@components/Footer";
import Layout from "@components/Layout";
import { useWorker } from "@context/HomeEmployerContext";
import Link from "next/link";
import Image from "next/image";
import { loader } from "@public/assets";
import { useEffect, useState } from "react";
import { useUser } from "@context/UserContext";

const Offers = () =>{
    const { myJobs, getMyJobs} = useWorker();
    const { userData } = useUser();

    const [ showDetails , setShowDetails] = useState([]);

    useEffect(()=>{
        const fetchData = async () => {
            try {
                if(!myJobs.length && userData){
                    await getMyJobs(userData._id);
                }
            } catch (error) {
                console.error('Error en la solicitud Axios:', error);
            }
        };
        fetchData();
    //eslint-disable-next-line
    },[])
    
    return(
        <Layout>
            {!myJobs.length? <>
                    <div className="flex justify-center pr-20">
                        <Image src={loader} width={400} height={200} alt="loading" priority={true}/>
                    </div>
            </>: <>
                <div className="flex justify-around">
                    <div className="w-1/5 h-80 p-4 mt-10">
                        <div className="bg-blue-300 h-60 p-5 flex flex-col justify-around pl-5 rounded-2xl">
                            <p>Ir a:</p>
                            <p className="font-bold">🏠 <Link href="/HomeEmployer">Home</Link></p>
                            <p className="font-bold">💼 <Link href="/HomeEmployer/HEOffers">Mis ofertas de Empleo</Link></p>
                            <p className="font-bold">📢 <Link href="/jobrequests">Crear oferta de Empleo</Link> </p>
                            <p className="font-bold"><Link href="/MyReviewsEmployer">⭐ Mis Reviews</Link></p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-around w-1/2 mt-10 mb-5">
                        <h1 onClick={()=> console.log(myJobs)} className="text-4xl font-bold">💼 Mis ofertas de Empleo</h1>
                        <p className="pt-5 pb-3 font-bold">{myJobs.length} ofertas de empleo creadas</p>
                        <div className="flex flex-col justify-around">
                            {myJobs.map((item)=>{
                                return(<>
                                    <div onClick={()=> setShowDetails(item)} key={item._id} className="flex justify-between bg-neutral-300 p-7 mt-5 rounded-xl duration-200 hover:scale-105">
                                        <div>
                                            <p className="font-bold text-xl pb-5">{item.title}</p>
                                            <p>Ubicación: {item.address[0].state} / {item.address[0].country}</p>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <p className="pb-5">Fecha de Publicación: {item.date.slice(0,10)}</p>
                                            <p>Destinado para: {item.type[0].name}</p>
                                        </div>
                                    </div>
                                </>)                             
                            })}                       
                        </div>   
                    </div>
                    {showDetails.title? <>
                        <div className="bg-neutral-300 w-1/4 h-fit mt-10 mb-10 p-8 rounded-2xl">
                            <h1 className="text-2xl mb-10 font-bold">Información del Empleo</h1>
                            <h1 className="text-xl font-bold mb-2">{showDetails.title}</h1>
                            <p className="mb-2">Descripcion: {showDetails.description} </p>
                            <p className="mb-10">Empleo destinado para: {showDetails.type[0].name}</p>
                            <div className="flex justify-around">
                                <Link href={`/HomeEmployer/HEOffers/${showDetails._id}`}>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Ver información detallada</button>
                                </Link>
                            </div>               
                        </div>
                    </>:<p className="w-1/4 h-full flex justify-center items-center">🚩 Por favor, seleccione un empleo.</p>
                    }
                    
                </div>
            </>}
            <Footer />          
        </Layout>
    )
}

export default Offers;