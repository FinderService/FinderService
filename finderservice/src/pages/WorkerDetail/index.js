import Footer from "@components/Footer";
import Layout from "@components/Layout";
import Image from "next/image"
import Link from "next/link";
import axios from "axios";
import { useWorker } from "@context/HomeEmployerContext";
import { loader } from '@public/assets';
import { useEffect } from "react";
import { useUser } from "@context/UserContext";
import { GoStar } from "react-icons/go";
import { IoIosStarOutline, IoIosStar } from "react-icons/io";



export default function WorkerDetail() {
  
  const { getWorker, getJobsReviews, jobsReviews} = useWorker();
  const { userData } = useUser();
  console.log("getworker de workerdetail", getWorker);

  
  useEffect(()=>{
    const fetchData = async () => {
        if (jobsReviews.length === 0) {
            await getJobsReviews(getWorker._id);
        }
    }
    fetchData();
    //eslint-disable-next-line
},[])

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

                                  <Link href="/MyOffers">
                                    <button class="bg-blue-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Ver Servicios</button>
                                  </Link>

                                  <p className="text-black font-bold"><Link href="/ReviewsWorker">Calificar<GoStar className="text-3xl text-blue-500 mx-auto text-center"/></Link></p>


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

          <div className="font-bold flex flex-col justify-center items-center">
  <h2 className="text-3xl text-titleFont text-blue-500 mb-6 flex items-center">
    <IoIosStarOutline className="text-gray-400"/><IoIosStarOutline className="text-gray-400"/><IoIosStarOutline className="text-gray-400"/>
      Opiniones del servicio  <IoIosStarOutline className="text-gray-400"/><IoIosStarOutline className="text-gray-400"/><IoIosStarOutline className="text-gray-400"/>
  </h2>
  <div className="justify-center items-center mt-5 flex flex-wrap">
    {jobsReviews.map((item, index) => (
      item.statejob === 'Done' ? (
        <div key={index} className="card bg-neutral-300 p-5 mb-10 mr-5 rounded-xl duration-200 hover:scale-105 w-[35rem] border border-blue-500">
          <p><strong>Empleador:</strong> {item.employer[0].name}</p>
          <div className="flex items-center">
            <p><strong>Rating:</strong> {item.ratingWorker}</p>
            {Array.from({ length: item.ratingWorker }, (_, index) => (
              <IoIosStar className="text-blue-500" key={index} />
            ))}
          </div>
          <p><strong>Comentario:</strong> {item.reviewWorker}</p>
        </div>
      ) : null
    ))}
  </div>
  <div className="h-40"></div>
</div>




          
        <Footer/>
    </Layout>
    
  )
}