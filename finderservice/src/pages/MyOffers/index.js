import Footer from "@components/Footer";
import Layout from "@components/Layout";
import Link from "next/link";

export default function MyOffers() {
  return (
    <Layout>
    <div className="font-bold mb-2 flex justify-center items-center mt-10"><h2 className="text-3xl text-titleFont">Ofertas creadas por este Profesional</h2></div>
    <div className="mt-5 flex flex-row flex-wrap justify-center items-center">
    <div className="bg-neutral-300 p-5 mb-10 mr-5 ml-5 rounded-xl duration-200 hover:scale-105">
        <h2>Nombre del trabajo ofrecido</h2>
        <p>Descripción del servicio: </p>
        <p>Costos del servicio: </p>
        <br></br>
        <Link href="/Payment">
        <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">CONTRATAR</button>
        </Link>
    </div>
    <div className="bg-neutral-300 p-5 mb-10 mr-5 ml-5 rounded-xl duration-200 hover:scale-105">
        <h2>Nombre del trabajo ofrecido</h2>
        <p>Descripción del servicio: </p>
        <p>Costos del servicio: </p>
        <br></br>
        <Link href="/Payment">
        <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">CONTRATAR</button>
        </Link>
    </div>
    <div className="bg-neutral-300 p-5 mb-10 mr-5 ml-5 rounded-xl duration-200 hover:scale-105">
        <h2>Nombre del trabajo ofrecido</h2>
        <p>Descripción del servicio: </p>
        <p>Costos del servicio: </p>
        <br></br>
        <Link href="/Payment">
        <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">CONTRATAR</button>
        </Link>
    </div>
    <div className="bg-neutral-300 p-5 mb-10 mr-5 ml-5 rounded-xl duration-200 hover:scale-105">
        <h2>Nombre del trabajo ofrecido</h2>
        <p>Descripción del servicio: </p>
        <p>Costos del servicio: </p>
        <br></br>
        <Link href="/Payment">
        <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">CONTRATAR</button>
        </Link>
    </div>
    </div>
    <div className="h-40"></div>
    <Footer/>
    </Layout>
  )
}
