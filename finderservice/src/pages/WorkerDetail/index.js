import Footer from "@components/Footer";
import Layout from "@components/Layout";
import Image from "next/image"
import Link from "next/link";
import axios from "axios";
import { useWorker } from "@context/HomeEmployerContext";
import { loader } from '@public/assets';
//import { useEffect } from "react";

export default function WorkerDetail() {
  
  const { getWorker } = useWorker();
  console.log("getworker de workerdetail", getWorker);

  

//   const handlePayClick = async () => {
//     try {
      
//       const response = await axios.post("/api/payment", {
//         items: [
//           {
//             title: 'Worker',
//             quantity:1,
//             currency_id:'ARS',
//             unit_price:1000
//           }
//         ],
//         back_urls:{
//           success:'http://localhost:3000',
//           failure:'http://localhost:3000',
//           pending:'http://localhost:3000',
//         },
//         auto_return:'approved',
//         binary_mode:false,
//       });
//       const { init_point } = response.data;
//       // Redirige al usuario a la URL de pago proporcionada por `init_point`
//       window.location.href = init_point;
//     } catch (error) {
//       console.error("Error al crear la preferencia de pago:", error);
//     }
//   };

// //   useEffect(() => {
// //     const fetchData = async () => {
// //         if (dataWorker.length === 0) {
// //             await getWorker();
            
// //         }
// //     };
// //     fetchData();
// //     //eslint-disable-next-line
// // },[])

  
  return (
    <Layout>
       {!getWorker._id ? 
            <>
                <div className="flex justify-center pr-20">
                    <Image src={loader} width={400} height={200} alt="loading" priority={true}/>
                </div>
            </>
            :<>
        <div className="font-bold flex flex-col justify-center items-center"><h2 className="text-3xl text-titleFont mb-6">Detalle del profesional seleccionado</h2>
            <div className="justify-center items-center mt-5 flex flex-col flex-wrap">
                      <div key={getWorker._id} className="flex  bg-neutral-300 p-5 mb-10 mr-5 rounded-xl duration-200 hover:scale-105 w-[35rem]">
                        <Image key={getWorker._id} src={getWorker.profilepic} className="w-40 h-40" width={100} height={100} alt="pics"/>
                          <div className="pl-10 w-full flex justify-between">
                            <div className="flex flex-col justify-around">
                                <p>Nombre: {getWorker.name}</p>
                                <p>Teléfono: {getWorker.phone}</p>
                                <p>Profesión: {getWorker.type.map((getWorker) => getWorker.name).toString()}</p>    
                                {/* <br></br>                                        */}
                            <div class= "flex  items-center space-x-8 mt-5 flex-row">
                              
                                    {/* <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                                    onClick={handlePayClick}>CONTRATAR</button>
                                 */}

                                  <Link href="/MyOffers">
                                    <button class="bg-amber-400 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded">Ver Servicios</button>
                                  </Link>

                            </div>
                        </div>
                            </div>
                            <div className="flex flex-col items-end pr-5">
                                <p>Edad: {getWorker.age}</p>
                            </div>
                    </div>
                
            
            </div></div>
            <div className="h-40"></div>
          </>}
          
        <Footer/>
    </Layout>
    
  )
}