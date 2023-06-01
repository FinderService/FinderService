import Footer from "@components/Footer"
import Layout from "@components/Layout"
import Link from "next/link"
import Image from "next/image"
import { useWorkers } from "@context/WorkersContext"
import { loader } from "@public/assets"

const WorkDetails = () =>{
    const { postDetails } = useWorkers();
    return (
    <Layout>
        {postDetails.salary?
        <>
            <div className="text-3xl font-bold flex justify-center items-center mt-10">Detalle de la Postulación seleccionada</div>
                <div class="flex justify-center items-center mt-10 ">
                <div class="bg-white shadow-2xl rounded-xl px-8 pt-6 pb-8 mb-4">
                    <h2 className="text-2xl font-bold">Título: {postDetails.jobrequest[0].title}</h2>
                    <br></br>
                    <br></br>
                    <p className="font-bold">Publicado por: {postDetails.jobrequest[0].employer[0].name}</p>
                    <br></br>
                    <h3>- Ubicación: ????????</h3>
                    <br></br>
                    <p>- Fecha: ??????????</p>
                    <br></br>
                    <p>- Detalles del trabajo: {postDetails.jobrequest[0].description}</p>
                    <br></br>
                    <p>- Destinado para: {postDetails.jobrequest[0].type[0].name}</p>
                    <br></br>
                    <p >- Mensaje enviado: {postDetails.message}</p>
                    <br></br>
                    <p className="font-bold">Estado de la solicitud: {postDetails.state}</p>
                    <br></br>
                    <div class= "flex justify-center items-center space-x-8 mt-5 flex-row">
                        <Link href="/HomeWorker/Postulations">
                            <button class="bg-amber-400 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded">Volver</button>
                        </Link>
                    </div>        
                </div>  
            </div>
        </> : <>  
            <div className="flex justify-center pr-20">
                <Image src={loader} width={400} height={200} alt="loading" priority={true}/>
            </div>
        </>}
        <Footer/>
    </Layout>)
} 

export default WorkDetails;