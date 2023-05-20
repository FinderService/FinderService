import Footer from "@components/Footer";
import Layout from "@components/Layout";

export default function WorkDetail() {
  return (
    <Layout>
        <div className="font-bold flex justify-center items-center mt-10">Detalle de oferta seleccionada</div>
        <div class="flex justify-center items-center mt-10 ">
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2>Posible perdida de agua</h2>
            <h3>Ubicación: Avenida Siempreviva 123</h3>
            <p>Detalle de solicitud: Nececito que verifiquen una posible perdida de agua en el baño de mi casa de manera urgente</p>
            <div class= "flex justify-center items-center space-x-8 mt-5">
                <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Aceptar</button>
                <button class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Rechazar</button>
            </div>
           </div>
        </div>
        <Footer/>
    </Layout>
    
  )
}
