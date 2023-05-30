import Footer from "@components/Footer";
import Layout from "@components/Layout";
import Image from "next/image";
import Link from "next/link";
import { workers1 } from "@public/assets";
import { useRouter } from "next/router";
import { useWorker } from "@context/HomeEmployerContext";
import { useEffect } from "react";
import { useUser } from "@context/UserContext";
import { loader } from "@public/assets";

const Offer = () =>{
    const router = useRouter();
    const {id} = router.query;
    const { userData } = useUser();
    const { myJobById, getMyJobByID, infoReq, getMyJobPostulations } = useWorker();

    useEffect(()=>{
        const fetchData = async () => {
            try {
                if(userData._id){
                    await getMyJobByID(id);
                }
                if(myJobById._id){
                    await getMyJobPostulations(myJobById._id);
                }
            } catch (error) {
                console.error('Error en la solicitud Axios:', error);
            }
        };
        fetchData();
    //eslint-disable-next-line
    },[])

    return(
        <Layout >
            {!myJobById.title? <>
                    <div className="flex justify-center pr-20">
                        <Image onClick={() => console.log(id)} src={loader} width={400} height={200} alt="loading" priority={true}/>
                    </div>
            </>:<>
            <div className="flex justify-around">
                <div className="bg-blue-300 w-1/5 h-60 mt-10 p-5 flex flex-col justify-around pl-5 rounded-2xl">
                    <p>Ir a:</p>
                    <p className="font-bold">🏠 <Link href="/HomeEmployer">Home</Link></p>
                    <p className="font-bold">💼 <Link href="/HomeEmployer/HEOffers">Mis ofertas de Empleo</Link></p>
                    <p className="font-bold">📢 <Link href="/jobrequests">Crear oferta de Empleo</Link> </p>
                    <p className="font-bold">⭐ <Link href="/MyReviewsEmployer">Mis Reviews</Link></p>
                </div>
                <div className="w-1/2 mt-10 mb-10">
                    <h1 className="text-4xl font-bold mb-5">🛠️ {myJobById.title}</h1>
                    <p className="font-bold mb-5">Total de empleados postulados: {infoReq.length}</p>
                    <p>Empleados postulados:</p>
                    <div className="flex justify-around">
                            <Link href="/WorkerDetail">
                                <div className="w-60 m-5 p-5 bg-slate-300 rounded-2xl duration-200 hover:scale-105">
                                    <p>Nombre del empleado</p>
                                    <Image
                                        className="w-20"
                                        src={workers1}
                                        width={100}
                                        height={100}
                                        alt="waos"
                                    />
                                    <p>*Rating*</p>
                                    <p>Oficio/s: Jardinería</p>
                                    <p>Precio estimado: $$$$</p>
                                </div>
                            </Link>                                   
                    </div>
                </div>

                <div className="w-1/4">

                </div>
            </div>
            </>}
            <Footer />
        </Layout >
    )
}

export default Offer;