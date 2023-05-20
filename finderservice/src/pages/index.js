import Footer from "@components/Footer";
import HomeSlider from "@components/HomeSlider";
import Layout from "@components/Layout";
import { ubi } from '@public/assets';
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <Layout>
      <div
        className="w-full h-screen hero-home"
      >
        <div className="max-w-container h-full mx-auto font-titleFont flex flex-col items-center justify-center">
          
          <h1
            className="text-5xl font-titleFont font-semibold pb-2 text-yellow-400 drop-shadow-lg titleShadow"
          >
            Encuentra una solución a tu necesidad
          </h1>
          <h3
            className="text-2xl font-titleFont font-semibold pb-12 text-white titleShadow"
          >
            Plomer&iacute;a, jardiner&iacute;a, limpieza, albañiler&iacute;a y mucho m&aacute;s.
          </h3>

          <div
            className="w-1/2 py-3 px-3 bg-slate-300/60 rounded-md flex flex-row gap-2 backdrop-blur-sm boxShadow"
          >
            <Image src={ ubi } alt="ubication_icon" height="auto" width="auto" />
            <input 
              type="text" 
              placeholder="Dirección o punto de referencia" 
              className="bg-white/0 placeholder-gray-700 w-full text-xl border-none border-transparent outline-none "
            />
            <Link href='HomeEmployer' className="bg-gray-500/50 py-1 px-4 rounded-md hover:bg-blue-300 duration-300 transition-all"> Buscar </Link>
          </div>        
        </div>
      </div>
      <HomeSlider /> 
      <Footer />
    </Layout>
  )
}
