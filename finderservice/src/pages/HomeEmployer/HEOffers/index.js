import Footer from "@components/Footer";
import Layout from "@components/Layout";
import Link from "next/link";

const Offers = () =>{
    return(
        <Layout>
            <div className="flex justify-around">
                <div className="w-1/5 h-80 p-4 mt-10">
                    <div className="bg-blue-300 h-60 p-5 flex flex-col justify-around pl-5 rounded-2xl">
                        <p>Ir a:</p>
                        <p className="font-bold">🏠 <Link href="/HomeEmployer">Home</Link></p>
                        <p className="font-mono">💼 Mis ofertas de Empleo</p>
                        <p className="font-serif">📢 Crear oferta de Empleo</p>
                        <p className="font-sans">📝 Reviews</p>
                    </div>
                </div>
                <div className="flex flex-col justify-around w-1/2 mt-10 mb-5">
                    <h1 className="text-4xl font-bold">💼 Mis ofertas de Empleo</h1>
                    <p className="pt-5 pb-3 font-bold">4 ofertas de empleo creadas</p>
                    <div className="flex flex-col justify-around">
                        <div className="flex justify-between bg-neutral-300 p-7 mt-5 rounded-xl duration-200 hover:scale-105">
                            <div>
                                <p>Nombre de Oferta1</p>
                                <p>Descripción: Reparación de ...</p>
                            </div>
                            <div className="flex flex-col items-end">
                                <p>Postulados: 324</p>
                                <p>Destinado para: Obrero, Gasista</p>
                            </div>
                        </div>
                        <div className="flex justify-between bg-neutral-300 p-7 mt-5 rounded-xl duration-200 hover:scale-105">
                            <div>
                                <p>Nombre de Oferta2</p>
                                <p>Descripción: Reparación de ...</p>
                            </div>
                            <div className="flex flex-col items-end">
                                <p>Postulados: 324</p>
                                <p>Destinado para: Obrero, Gasista</p>
                            </div>
                        </div>
                        <div className="flex justify-between bg-neutral-300 p-7 mt-5 rounded-xl duration-200 hover:scale-105">
                            <div>
                                <p>Nombre de Oferta3</p>
                                <p>Descripción: Reparación de ...</p>
                            </div>
                            <div className="flex flex-col items-end">
                                <p>Postulados: 777</p>
                                <p>Destinado para: Gasista</p>
                            </div>
                        </div>

                        <div className="flex justify-between bg-neutral-300 p-7 mt-5 rounded-xl duration-200 hover:scale-105">
                            <div>
                                <p>Nombre de Oferta4</p>
                                <p>Descripción: Reparación de ...</p>
                            </div>
                            <div className="flex flex-col items-end">
                                <p>Postulados: 777</p>
                                <p>Destinado para: Gasista</p>
                            </div>
                        </div>
                    </div>   
                </div>
                <div className="bg-neutral-300 w-1/4 h-fit mt-10 mb-10 p-8 rounded-2xl">
                    <h1 className="text-2xl mb-5 font-bold">Información del Empleo</h1>
                    <h1 className="text-xl mb-2">Título del empleo</h1>
                    <p className="mb-2"> Descripción: Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        It has survived not only five centuries, but also the leap into electronic typesetting,
                        remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
                        containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
                        PageMaker including versions of Lorem Ipsum.</p>
                    <p className="mb-2">Empleo destinado para: Gasista</p>
                    <p className="mb-6">Total de postulados: 777</p>
                    <div className="flex justify-around">
                        <Link href="/HomeEmployer/HEOffers/Offer">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Ver información detallada</button>
                        </Link>
                    </div>
                    
                </div>
            </div>
            <Footer />
        </Layout>
    )
}

export default Offers;