import Footer from "@components/Footer"
import Layout from "@components/Layout"
import Link from "next/link"
import Image from "next/image"
import { workers1 } from "@public/assets"

const WorkDetails = () =>{
    return (
    <Layout>
        <div className="font-bold flex justify-center items-center mt-10">Detalle de la Postulación seleccionada</div>
        <div class="flex justify-center items-center mt-10 ">
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2>Título del trabajo</h2>
            <br></br>
            <Image src={workers1} className="w-36 h-fit" alt="xd3"/>
            <br></br>
            <h3>Ubicación: Avenida Siempreviva 123</h3>
            <br></br>
            <p>Detalles del trabajo: Necesito a un jardinero urgentemente, mis plantas se encuentran en muy mal estado.</p>
            <br></br>
            <p>Destinado para: Jardinero</p>
            <br></br>
            <p>Fecha: 2022/04/12</p>
            <br></br>
            <p>Publicado por: Noé</p>
            <br></br>
            <p>Estado de la solicitud: Pending</p>
            <br></br>
            <div class= "flex justify-center items-center space-x-8 mt-5 flex-row">
                  <Link href="/HomeWorker/Postulations">
                    <button class="bg-amber-400 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded">Volver</button>
                  </Link>
            </div>        
           </div>  
        </div>
        <Footer/>
    </Layout>)
} 

export default WorkDetails