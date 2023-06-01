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
    const { myJobById, setMyJobById, getMyJobByID, infoReq, getMyJobPostulations, setDataPostulation } = useWorker();

    useEffect(()=>{
        const fetchData = async () => {
            try {
                if(userData._id){
                    const { _id } = await getMyJobByID(id);
                    await getMyJobPostulations(_id);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
        return(setMyJobById({}))
    //eslint-disable-next-line
    },[])

    const saveWorkID = (data) =>{
        setDataPostulation(data)
        console.log(data);
    }

    return(
        <Layout >
            {(myJobById.title)? <>
            <div className="flex justify-around">
                <div className="bg-blue-300 w-1/5 h-60 mt-10 p-5 flex flex-col justify-around pl-5 rounded-2xl">
                    <p>Ir a:</p>
                    <p className="font-bold">🏠 <Link href="/HomeEmployer">Home</Link></p>
                    <p className="font-bold">💼 <Link href="/HomeEmployer/HEOffers">Mis ofertas de Empleo</Link></p>
                    <p className="font-bold">📢 <Link href="/jobrequests">Crear oferta de Empleo</Link> </p>
                </div>
                <div className="w-1/2 mt-10 mb-10">
                    <h1 onClick={()=> console.log(infoReq)} className="text-4xl font-bold mb-5">{`🛠️ ${myJobById.title}`}</h1>
                    {infoReq.length? <>
                        <p onClick={()=> console.log(myJobById)} className="font-bold mb-5">Total de empleados postulados: {infoReq.length}</p>
                        <p>Empleados postulados:</p>
                        <div className="flex flex-col justify-around">
                            {infoReq.map((info)=>{
                                return(<>                               
                                    <div className=" m-5 p-5 pl-10 bg-slate-300 rounded-2xl duration-200 hover:scale-105">
                                        <p className="font-bold text-xl mb-3">{info.worker[0].name}</p>
                                        <div className="flex justify-between">
                                            <Image
                                                className="w-20 mb-3"
                                                src={info.worker[0].profilepic}
                                                width={100}
                                                height={100}
                                                alt="waos"
                                            />
                                            <div className="ml-20 flex flex-col justify-around">
                                                <p>Precio estimado: ${info.salary}</p>
                                                <p>E-mail: {info.worker[0].email}</p>
                                                <p>Mensaje: {info.message}</p>
                                            </div>
                                            <div className="w-1/4 flex justify-end">
                                            <button onClick={()=> saveWorkID(info)} className="w-1/2 h-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold p-3 rounded-2xl"><Link href="/HomeEmployer/Contratacion">Contratar</Link> </button>
                                            </div>
                                        </div>                                       
                                    </div>                                
                                </>
                                )
                            })}                                                         
                        </div>
                    </>  : <>
                        <div className="mt-20 flex justify-center items-center">
                            <p className="font-bold text-xl">🚩 !No hay postulaciones pendientes! 🚩</p>         
                        </div>
                    </>}
                </div>

                <div className="w-1/4">

                </div>
            </div>
            </>:<> 
                <div className="flex justify-center pr-20">
                    <Image src={loader} width={400} height={200} alt="loading" priority={true}/>
                </div>
            </>}            
            <Footer />
        </Layout >
    )
}

export default Offer;