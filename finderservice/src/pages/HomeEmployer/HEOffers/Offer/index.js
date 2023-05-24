import Footer from "@components/Footer";
import Layout from "@components/Layout";
import Image from "next/image";
import Link from "next/link";
import { workers1 } from "@public/assets";


const Offer = () =>{
    return(
        <Layout >
            <div className="flex justify-around">
                <div className="bg-blue-300 w-1/5 h-60 mt-10 p-5 flex flex-col justify-around pl-5 rounded-2xl">
                    <p>Ir a:</p>
                    <p className="font-bold">🏠 <Link href="/HomeEmployer">Home</Link></p>
                    <p className="font-bold">💼 <Link href="/HomeEmployer/HEOffers">Mis ofertas de Empleo</Link></p>
                    <p className="font-bold">📢 <Link href="/contratar">Crear oferta de Empleo</Link> </p>
                    <p className="font-bold">📝 Reviews</p>
                </div>
                <div className="w-1/2 mt-10 mb-10">
                    <h1 className="text-4xl font-bold mb-5">🛠️ Reparación de tubos de agua y grifo </h1>
                    <p className="font-bold mb-5">Total de empleados postulados: 2</p>
                    <p>Empleados postulados:</p>
                    <div className="flex justify-around">
                        <Link href="/WorkerDetail">
                            <div className="w-60 m-5 p-5 bg-slate-300 rounded-2xl duration-200 hover:scale-105">
                                <p>Nombre del empleado</p>
                                <Image
                                    className="w-20"
                                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                                    width={100}
                                    height={100}
                                    alt="waos"
                                />
                                <p>*Rating*</p>
                                <p>Oficio/s: Jardinería</p>
                                <p>Precio estimado: $$$$</p>
                            </div>
                        </Link>

                        <Link href="/WorkerDetail">
                            <div className="w-60 m-5 p-5 bg-slate-300 rounded-2xl duration-200 hover:scale-105">
                                <p>Pedro Gomez</p>
                                <Image src={workers1} className="w-20" alt="xd"/>
                                <p>*Rating*</p>
                                <p>Oficio/s: Fontanería</p>
                                <p>Precio estimado: $$$$</p>
                            </div>
                        </Link>
                        
                    </div>
                </div>

                <div className="w-1/4">

                </div>
            </div>
            <Footer />
        </Layout >
    )
}

export default Offer;