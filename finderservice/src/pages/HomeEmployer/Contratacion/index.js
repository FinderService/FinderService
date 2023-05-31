import Layout from "@components/Layout";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useWorker } from "@context/HomeEmployerContext";
import { useUser } from "@context/UserContext";
import { useRouter } from "next/router";

const Contratacion = () =>{
    const {postInfoToPostulation} = useWorker();
    const {userData} = useUser();
    const router = useRouter();

    const[sure,setSure] = useState(false);

    const [postulationData] = useState({...JSON.parse(localStorage.getItem('workID'))});
    const [formData, setFormData] = useState({
        jobrequestId: postulationData.jobrequest[0],
        jobpostulationId: postulationData._id,
        workerId: postulationData.worker[0]._id,
        employerId: userData._id,
    })
    
    useEffect(()=>{

        if (postulationData._id && postulationData.worker[0]._id && userData._id) {
            setFormData({
                ...formData,
                jobrequestId: postulationData.jobrequest[0],
                jobpostulationId: postulationData._id,
                workerId: postulationData.worker[0]._id,
            });
          }
    //eslint-disable-next-line        
    },[userData._id])

    const handleSubmit = () =>{    
        postInfoToPostulation(formData)
        router.replace('/HomeWorker/HEOffers')
        localStorage.removeItem('workID');
        console.log(formData);
    }

    return(
        <Layout>
            {!localStorage.getItem('workID')? <>
                <div className="flex justify-center items-center w-full h-screen">
                    <div className="flex flex-col items-center">
                        <p className="mb-10 font-bold text-xl">¡Necesitas seleccionar un empleado para poder contratarlo!</p>
                        <Link href="/"><button className="font-bold bg-yellow-500 p-3 rounded-2xl">Volver al Home</button></Link>
                    </div>
                </div>
            </>:<>
            <div className="w-full h-screen flex justify-center items-center">
                <div className="flex flex-col">
                    <div className="font-bold flex justify-center items-center mt-10">Detalle del profesional seleccionado</div>
                    <div class="flex justify-center items-center mt-10 ">
                        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                            {postulationData.salary && userData._id?<>                        
                                <h2 className="font-bold text-xl">{postulationData.worker[0].name}</h2>
                                <br></br>
                                <div className="flex justify-center">
                                    <Image width={200} height={200} src={postulationData.worker[0].profilepic} className="w-36 h-fit" alt="xd3"/>
                                </div>
                                <br></br>
                                <h3>E-mail: {postulationData.worker[0].email}</h3>
                                <br></br>
                                <h3>Precio estimado: ${postulationData.salary}</h3>
                                <br></br>
                                <h3>Mensaje: {postulationData.message}</h3>
                                <br></br>
                                <div class= "flex justify-center items-center space-x-8 mt-5 flex-row">
                                    <button onClick={()=> setSure(true)} class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">CONTRATAR</button>
                                    <button class="bg-amber-400 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded"><Link href="/HomeWorker/HEOffers">Volver</Link></button>
                                </div>
                            </>:<>
                                <p>Cargando...</p>
                            </>                            
                            }
                            {sure && (<>
                                <div dialogClassName="avatar-modal" className="w-full h-screen absolute top-0 left-0 bg-black/50 z-40 flex flex-col items-center justify-center">
                                    <div className="bg-white w-[40rem] pl-10 pr-10 pt-5 rounded-md flex flex-col overflow-hidden shadow-2xl">
                                     <p>¿Estás seguro de contratar a {postulationData.worker[0].name}?</p>
                                     <div className="p-4 flex flex-row gap-3 items-center justify-end">
                                            <button value="no" className="btn-navbar" onClick={()=> setSure(false)}>No</button>
                                            <button value="si" className="btn-navbar" onClick={handleSubmit} variant="primary" >Sí</button>
                                        </div>
                                    </div>
                                </div>
                            </>)                           
                            }
                        </div>  
                    </div>
                </div>
            </div>
            </>}          
        </Layout>
    )
}

export default Contratacion;