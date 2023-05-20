import Footer from "@components/Footer";
import Layout from "@components/Layout";
import { workers1 } from "@public/assets";
import Image from "next/image"
import Link from "next/link";
import axios from "axios";

export default function WorkerDetail() {

  const handlePayClick = async () => {
    try {
      
      const response = await axios.post("/api/payment", {
        items: [
          {
            title: 'Worker',
            quantity:1,
            currency_id:'ARS',
            unit_price:1000
          }
        ],
        back_urls:{
          success:'http://localhost:3000',
          failure:'http://localhost:3000',
          pending:'http://localhost:3000',
        },
        auto_return:'approved',
        binary_mode:false,
      });
      const { init_point } = response.data;
      // Redirige al usuario a la URL de pago proporcionada por `init_point`
      window.location.href = init_point;
    } catch (error) {
      console.error("Error al crear la preferencia de pago:", error);
    }
  };


  return (
    <Layout>
        <div className="font-bold flex justify-center items-center mt-10">Detalle del profesional seleccionado</div>
        <div class="flex justify-center items-center mt-10 ">
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
             <Image src={workers1} className="w-36 h-fit"/>
             <br></br>
            <h2>Nombre: Pedro Gomez</h2>
            <br></br>
            <h3>Ubicación: Avenida Siempreviva 123</h3>
            <br></br>
            <p>Detalle de trabajador: Servicios de fontanería profesional con mas de cinco años de experiencia en el rubro.</p>
            <div class= "flex justify-center items-center space-x-8 mt-5 flex-row">
                {/* <Link href="/Payment"> */}
                <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                        onClick={handlePayClick}>CONTRATAR</button>
                {/* </Link> */}
                <Link href="/MyOffers">
                <button class="bg-amber-400 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded">Ver Servicios</button>
                </Link>
            </div>
           
           </div>
        </div>
        <Footer/>
    </Layout>
    
  )
}