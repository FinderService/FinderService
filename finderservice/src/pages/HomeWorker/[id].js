import Footer from "@components/Footer";
import Layout from "@components/Layout";
import Image from "next/image";
import { useWorkers } from "@context/WorkersContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { loader } from '@public/assets';
import Link from "next/link";

export default function WorkDetail() {
    const { workDetail, setWorkDetail} = useWorkers();

    useEffect(()=>{
        return (setWorkDetail([]))
    },[workDetail,setWorkDetail])

    return (
        <Layout>
            {workDetail.name? <>
            <div className="font-bold text-3xl flex justify-center items-center mt-10">Detalle de oferta seleccionada</div>
            <div class="flex justify-center items-center mt-10 ">
                <div class="flex justify-around bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-10">
                    <Image className="mr-10 ml-5" src={workDetail.photo} width={300} height={300} alt="workDetail"/>
                    <div className="flex flex-col justify-around">
                        <h2 className="font-bold text-2xl">{workDetail.name}</h2>
                        <h3>Información del trabajo: {workDetail.description}</h3>
                        <p>Ubicación: {workDetail.address}</p>
                        <p>Fecha: {workDetail.date}</p>
                        <p>Destinado para: {" - "}</p>
                        <p>Publicado por {workDetail.employer}</p>
                        <div class= "flex justify-center items-center space-x-8 mt-5">
                            <Link href="/trabajar"><button class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Postularme</button></Link>
                            <Link href="/HomeWorker"><button class="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">Volver</button></Link>
                        </div>
                    </div>
                </div>
            </div>
            </>: <div className="flex justify-center">
                    <Image src={loader} width={600} height={300} alt="loading"/>
                </div>}
            <Footer/>
        </Layout>
    )
}