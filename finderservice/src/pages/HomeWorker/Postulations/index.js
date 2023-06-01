import Footer from "@components/Footer";
import Layout from "@components/Layout";
import { useWorkers } from "@context/WorkersContext";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { loader } from "@public/assets";
import { useUser } from "@context/UserContext";
import { useWorker } from "@context/HomeEmployerContext";

const MyPostulations = () =>{
    const { userData } = useUser();
    const { myPostulations, getMyPostulations, postDetails, setPostDetails, getJobIDWorker} = useWorkers();

    const [wait, setWait] = useState(false);

    useEffect(()=>{
        const fetchData = async () => {
            if (myPostulations.length === 0 && userData._id) {
                await getMyPostulations(userData._id);
            }
        }
        fetchData();
        //eslint-disable-next-line
    },[])

    const sendDataToReviews = async () =>{
        setWait(true);
        await getJobIDWorker(postDetails.jobrequest[0]._id, postDetails._id);   //idRequest & idPostulation
        setWait(false);
    }

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
                        <p className="pt-5 pb-3 font-bold">{myPostulations.length} postulaciones aplicadas a trabajos</p>
                        <div className="flex flex-col justify-around">
                            {myPostulations.length? myPostulations.map((item)=>{
                                return(<>
                                    <div onClick={()=> setPostDetails({...item})} key={item.salary} className="flex justify-between bg-neutral-300 p-7 mt-5 rounded-xl duration-200 hover:scale-105">
                                        <div>
                                            <p className="font-bold text-xl mb-2">Título: {item.jobrequest[0].title}</p>
                                            <p>Description: {item.jobrequest[0].description}</p>
                                            <div className="flex flex-row mt-2">
                                                    <p>Estado:</p>
                                                    {(item.state === 'pending')?<>
                                                        <p className="font-bold text-neutral-600">&nbsp;&nbsp;&nbsp;{item.state.toUpperCase()}</p>
                                                    </>: (item.state === 'accepted')? <> 
                                                        <p className="font-bold text-green-500">&nbsp;&nbsp;&nbsp;{item.state.toUpperCase()}</p>
                                                    </>:<> 
                                                        <p className="font-bold text-red-700">&nbsp;&nbsp;&nbsp;{item.state.toUpperCase()}</p>
                                                    </>}                                     
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <p className="mb-2">Propuesta de salario: ${item.salary}</p>
                                            <p>Destinado para: {item.jobrequest[0].type[0].name}</p>
                                        </div>
                                    </div>
                                </>)
                            })
                            :<>
                                <p>No hay postulaciones realizadas.</p>
                            </>}
                        </div>   
                    </div>
                    <div className="bg-neutral-300 w-1/4 h-fit mt-10 mb-10 p-8 rounded-2xl">
                    {postDetails.salary?<>
                        <h1 onClick={()=>console.log(postDetails)} className="text-2xl mb-5 font-bold">Información del Empleo</h1>
                        <h1 className="text-xl font-bold mb-2">{postDetails.jobrequest[0].title}</h1>
                        <p className="mb-2">Descripcion: {postDetails.jobrequest[0].description} </p>
                        <p className="mb-2">Empleo destinado para: {postDetails.jobrequest[0].type[0].name}</p>
                        <br></br>
                        <p className="mb-2 font-bold">Postulacion:</p>
                        <p className="mb-2">Propuesta de salario: ${postDetails.salary}</p>
                        <p className="mb-2">Message: {postDetails.message}</p>
                        <p className="font-bold">Publicado por: {postDetails.jobrequest[0].employer[0].name}</p>
                        <br></br>
                        <div className="flex justify-around">
                            {postDetails.state === 'accepted'?<>
                                <Link href="/ReviewsWorker" >
                                    <button onClick={sendDataToReviews} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Terminar & Calificar</button>
                                </Link>
                            </>:<>
                                <Link href={`/HomeWorker/Postulations/PostDetails`}>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Ver información detallada</button>
                                </Link>
                            </>}
                        </div>   
                    </>:<>
                        <p>🚩 Seleccione una postulacion para ver la información.</p>
                    </>
                    }
                    {wait && (<>
                        <div dialogClassName="avatar-modal" className="w-full h-screen absolute top-0 left-0 bg-black/50 z-40 flex flex-col items-center justify-center">
                            <div className="bg-white w-[40rem] pl-10 pr-10 pt-5 rounded-md flex flex-col items-center overflow-hidden shadow-2xl">
                                <Image src={loader} width={300} height={150} alt="loading"/>
                                </div>
                        </div>
                    </>)}                    
                    </div>
                </div> 
            </>}
        <Footer />
        </Layout>
    )
}

export default MyPostulations;