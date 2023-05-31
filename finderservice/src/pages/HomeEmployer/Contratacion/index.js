import Layout from "@components/Layout";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const Contratacion = () =>{
    const [postulationData, setPostulation] = useState({});

    useEffect(()=>{
        askInfo();
    //eslint-disable-next-line        
    },[])

    const askInfo = () =>{
        setPostulation({...JSON.parse(localStorage.getItem('workID'))})
        const a = JSON.parse(localStorage.getItem('workID'))
        console.log(a);
        //localStorage.removeItem('workID');
    }

    return(
        <Layout>
            {!(localStorage.getItem('workID'))? <>
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
                            {postulationData.salary?<>                        
                                <h2 className="font-bold text-xl">{postulationData.worker[0].name}</h2>
                                <br></br>
                                <div className="flex justify-center">
                                    <Image width={200} height={200} src={postulationData.worker[0].profilepic} className="w-36 h-fit" alt="xd3"/>
                                </div>
                                <br></br>
                                <h3>E-mail: {postulationData.worker[0].email}</h3>
                                <br></br>
                                <h3>Precio estimado: {postulationData.salary}</h3>
                                <br></br>
                                <h3>Mensaje: {postulationData.message}</h3>
                                <br></br>
                                <div class= "flex justify-center items-center space-x-8 mt-5 flex-row">
                                    <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">CONTRATAR</button>
                                    <button class="bg-amber-400 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded">Volver</button>
                                </div>
                            </>:<>
                                <p>Cargando...</p>
                            </>                            
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