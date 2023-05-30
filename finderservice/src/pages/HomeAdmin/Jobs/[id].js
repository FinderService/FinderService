import Image from "next/image";
import NavBarAdmin from "@components/NavBarAdmin";
import Layout from "@components/Layout";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useUser } from "@context/UserContext";
import { useRouter } from "next/router";
import { useAdmin } from "@context/AdminContext";
import { loader } from "@public/assets";
import Link from "next/link";
import adminJobValidation from "@/utils/adminJobValidation";

const JobsDetails = () =>{
    const {data: session} = useSession(); 
    const { userData } = useUser();
    const { jobDetails, setJobDetails, getJobByID, putJobDataByID, getAllJobReqs} = useAdmin();
    const router = useRouter();
    const { id } = router.query;

    const [ showForm , setShowForm ] = useState(false);
    const [sure,setSure] = useState(false);
    const [wait , setWait] = useState(false);

    const [formData , setFormData ] = useState({
        ...jobDetails,
        title: jobDetails.title
    })

    const [error, setError] = useState({
        title: "",
        flag: true
    })

    useEffect(()=>{
        const fetchData = async () => {
            if(userData.name){
                await getJobByID(id);
            }           
        };
        fetchData();
        return (setJobDetails({}));
    //eslint-disable-next-line
    },[])

    const handleClick = (event) => {
        const show = !showForm;
        setShowForm(show);
      };

    const handleChange = (event) =>{
        const value = event.target.value;
        const prop = event.target.name;
        setFormData({...formData, [prop]: value});
        setError(adminJobValidation({...formData, [prop]: value}));
    }

    const handleSubmit = async () =>{
        if(!error.flag){
            setSure(false);
            alert("Usuario: Por favor complete correctamente los datos.")           
            return;
        }
        console.log(formData);
        setWait(true);
        await putJobDataByID(formData, formData._id);
        await getAllJobReqs();
        setWait(false);
        setJobDetails(formData);
        setShowForm(false)
        setSure(false);
    }

    if (session) {
        return (<>
        <Layout >
            <div className="flex justify-start">
                <NavBarAdmin />
                {jobDetails.title? <>
                    <div className="flex justify-center items-center bg-stone-800 w-full h-screen">
                        <div className="p-10 bg-neutral-200 flex w-3/4 rounded-2xl shadow-2xl">
                            <div className="w-1/2">
                                <div className="flex-col pl-10">
                                    <p className="mb-3 font-bold text-3xl">{jobDetails.title}</p>
                                    <p className="mb-1">Destinado para: {jobDetails.type[0].name}</p>
                                    <p className="mb-1">Description: {jobDetails.description}</p>
                                    <p className="mb-1">Fecha de publicacion: {jobDetails.date.slice(0,10)}</p>
                                    <p>Ubicación: {jobDetails.address[0].name} - {jobDetails.address[0].city}</p>
                                    <br/>
                                    <p className="font-bold">Publicado por: {jobDetails.employer[0].name}</p>
                                </div>
                                <br/>
                            </div>
                            <div className="flex flex-col items-end w-1/2 h-1/6">
                                <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Editar</button>
                                <br/>
                                <Link href="/HomeAdmin/Jobs"><button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">Volver</button></Link>
                            </div>
                        </div>
                    </div>  
                    {showForm && (
                        <div dialogClassName="avatar-modal" className="w-full h-screen absolute top-0 left-0 bg-black/50 z-40 flex flex-col items-center justify-center">
                            <div className="bg-white w-[40rem] pl-10 pr-10 pt-5 rounded-md flex flex-col overflow-hidden shadow-2xl">
                                <p className="font-bold text-2xl">Editar datos del Trabajo</p>
                                <label >Titulo</label>
                                {(jobDetails.title === formData.title)? <></> : <p className="text-yellow-600">Titulo modificado</p>}
                                <input name="title" value={formData.title} onChange={handleChange} className="border-2 border-black shadow-sm pl-2 mb-10" placeholder={`${jobDetails.title}`}/>
                                {(!error.flag && error.title)? <p className="text-red-600">{error.title}</p> : <></>}
                                <div className="p-4 flex flex-row gap-3 items-center justify-end bg-slate-100">
                                    <button className="btn-navbar" onClick={handleClick}>Cerrar</button>
                                    <button className="btn-navbar" onClick={() => setSure(true)} variant="primary" >Guardar</button>
                                </div>
                            </div>
                        </div>                               
                    )}
                    {sure && (<>
                                <div dialogClassName="avatar-modal" className="w-full h-screen absolute top-0 left-0 bg-black/50 z-40 flex flex-col items-center justify-center">
                                    <div className="bg-white w-[40rem] pl-10 pr-10 pt-5 rounded-md flex flex-col overflow-hidden shadow-2xl">
                                     <p>¿Estás seguro que los datos modificados son correctos?</p>
                                     <div className="p-4 flex flex-row gap-3 items-center justify-end">
                                            <button value="no" className="btn-navbar" onClick={() => setSure(false)}>No</button>
                                            <button value="si" className="btn-navbar" onClick={handleSubmit} variant="primary">Sí</button>
                                        </div>
                                    </div>
                                </div>
                    </>)}
                    {wait && (<>
                        <div dialogClassName="avatar-modal" className="w-full h-screen absolute top-0 left-0 bg-black/50 z-40 flex flex-col items-center justify-center">
                            <div className="bg-white w-[40rem] pl-10 pr-10 pt-5 rounded-md flex flex-col items-center overflow-hidden shadow-2xl">
                                <Image src={loader} width={300} height={150} alt="loading"/>
                                </div>
                        </div>
                    </>)}                
                </>:<>
                    <div className="flex justify-center items-center bg-white w-full h-screen">
                        <div className="flex justify-center">
                            <Image src={loader} width={600} height={300} alt="loading"/>
                        </div>
                    </div>
                </>}                            
            </div>
        </Layout>
        </>)
    }
    return <p>Access Denied</p>; 
}

export default JobsDetails;