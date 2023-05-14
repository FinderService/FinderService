import Footer from "@components/Footer";
import Layout from "@components/Layout";
import Link from "next/link";


export default function HomeWorker() {
    
    const Offers = ["Offer1", "Offer2", "Offer3", "Offer4", "Offer5", "Offer6", "Offer7", "Offer8", "Offer9"]

  return (
    
    <Layout>
         <div className="bg-white  flex justify-around">
        <div className="mt-14 flex flex-col w-1/5 h-fit">
        <div className="bg-neutral-300 mt-10 mb-10 p-6 rounded-xl">
                        <Link href="/CreateService">
                        <button className="font-bold mb-2">Crea un nuevo aviso</button>
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col justify-around pt-5 mt-14 mb-6 pl-10 w-1/2 rounded-xl">
                    <div className="w-5/6 py-3 px-3 bg-slate-300/60 rounded-md flex flex-row gap-2 backdrop-blur-sm ">
                        <input type="text" placeholder="Buscar por oferta" className="bg-white/0 placeholder-gray-700 w-full text-xl border-none border-transparent outline-none "/>
                    </div>
                    <div className="font-bold mb-2 mt-5">{Offers.length} resultados encontrados</div>
                    <div className="mt-5 flex flex-col flex-wrap">
                        {Offers.map((info)=>{
                            return (
                                <Link href="/WorkDetail">
                                <div key={info} className="bg-neutral-300 p-5 mb-10 mr-5 rounded-xl duration-200 hover:scale-105">
                                    <h2>Nombre: {info}</h2>
                                    <p>Informacion de: {info}</p>
                                </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
                <div className="bg-neutral-300 flex flex-col w-1/6 h-fit mt-14 mb-10 p-6 rounded-xl">
                    <div>
                        <label className="font-bold mb-2">Tus Postulaciones</label>
                        <select name="Payment" className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded focus:outline-none focus:border-gray-500">
                            <option value="Ordenar">-Detalle-</option>
                        </select>
                    </div>
                </div>
                </div>
    <Footer/>
    </Layout>
    
    )
}
