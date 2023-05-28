import Layout from "@components/Layout";
import NavBarAdmin from "@components/NavBarAdmin";
import { useAdmin } from "@context/AdminContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import { loader } from "@public/assets";
import { useSession } from "next-auth/react";
import Link from "next/link";
import adminValidation from "@/utils/adminUserValidation";

const userDetail = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const { userDetail , getUserByID, setUserDetail} = useAdmin();
    const { id } = router.query;

    const [showForm ,setShowForm ] = useState(false);
    const [ sure , setSure ] = useState(false);

    const [formData, setFormData] = useState({
        ...userDetail,
        name: userDetail.name,
        email: userDetail.email,
        phone: userDetail.phone
    })

    const [error, setError] = useState({
        name: "",
        email: "",
        phone: "",
        flag: true
    })

    useEffect(()=>{
        getUserByID(id);
        return (setUserDetail({}))
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
        setError(adminValidation({...formData, [prop]: value}));
    }

    const changeActive = (event) =>{
        const value = event.target.value;
        if(value === 'active'){
            setFormData({...formData, active: !formData.active})
        }else{
            setFormData({...formData, deleted: !formData.deleted})
        }   
    }

    const handleSubmit = () =>{
        if(!error.flag){
            alert("Usuario: Por favor complete correctamente los datos.")
            return;
        }
        console.log(error);
        console.log(formData);
        setSure(false);
    }


    if (session) {
        return(
         <Layout>
            <div className="flex justify-start">
                <NavBarAdmin />
                    {userDetail.name? <>
                        <div className="flex justify-center items-center bg-stone-800 w-full h-screen">
                            <div className="p-10 bg-neutral-200 flex w-3/4 rounded-2xl">
                                <Image src={userDetail.profilepic} width={350} height={300} alt="userpic"/>
                                <div className="w-1/2">
                                    <div className="flex-col pl-10">
                                        <p className="font-bold text-3xl">{userDetail.name}</p>
                                        <p>Tipo de usuario: {userDetail.profile}</p>
                                        <p>Fecha de nacimiento: {userDetail.birthdate.slice(0,10)}</p>
                                        <p>Edad: {userDetail.age}</p>
                                        <p>Rating: {userDetail.rating} ⭐</p>
                                        <br/>
                                        <p className="font-bold">Contacto:</p>
                                        <p>E-mail: {userDetail.email}</p>
                                        <p>Phone: {userDetail.phone}</p>
                                    </div>
                                    <br/>
                                    <div className="flex-col pl-10">
                                        <p className="font-bold">Configuracion de cuenta:</p>
                                        <div className="flex">
                                            <p>Estado de cuenta: {` `}</p>
                                            { userDetail.deleted? <p className="text-red-600"> INHABILITADA</p> : <p className="text-lime-600"> HABILITADA</p>}
                                        </div>
                                        <div className="flex">
                                            <p>Validación: {` `}</p>
                                            {userDetail.active? <p className="text-lime-600"> VERIFICADA</p> : <p className="text-red-600"> NO VERIFICADA</p>}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end w-1/6 h-1/6">
                                    <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Editar</button>
                                    <br/>
                                    <Link href="/HomeAdmin/Usuarios"><button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">Volver</button></Link>
                                </div>
                            </div>
                            {showForm && (
                                <div dialogClassName="avatar-modal" className="w-full h-screen absolute top-0 left-0 bg-black/50 z-40 flex flex-col items-center justify-center">
                                    <div className="bg-white w-[40rem] pl-10 pr-10 pt-5 rounded-md flex flex-col overflow-hidden shadow-2xl">
                                        <p className="font-bold text-2xl">Editar datos del usuario</p>
                                        <label >Nombre</label>
                                        <input name="name" value={formData.name} onChange={handleChange} className="border-2 border-black shadow-sm pl-2" placeholder={`${userDetail.name}`}/>
                                        {(!error.flag && error.name)? <p className="text-red-600">{error.name}</p> : <></>}
                                        
                                        <label>Phone</label>
                                        <input name="phone" value={formData.phone} onChange={handleChange} className="border-2 border-black shadow-sm pl-2" placeholder={`${userDetail.phone}`}/>
                                        {(!error.flag && error.phone)? <p className="text-red-600">{error.phone}</p> : <></>}
                                        
                                        <label>E-mail</label>
                                        <input name="email" value={formData.email} onChange={handleChange} className="border-2 border-black shadow-sm pl-2" placeholder={`${userDetail.email}`}/>
                                        {(!error.flag && error.email)? <p className="text-red-600">{error.email}</p> : <></>}
                                        <div className="mb-10 mt-10 flex justify-around">
                                            <p>Estado de cuenta: {formData.deleted? "INHABILITADA" : "HABILITADA"}</p>
                                            <button value="deleted" onClick={changeActive} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{formData.deleted? "Habilitar" : "Inhabilitar"}</button>
                                        </div>
                                        <div className="mb-10 flex justify-around">
                                            <p>Validacion de cuenta: {formData.active? "VERIFICADA": "NO VERIFICADA"}</p>
                                            <button value="active" onClick={changeActive} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{formData.active? "Anular verificacion" : "Verificar"}</button>
                                        </div>    
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
                                     <div className="p-4 flex flex-row gap-3 items-center justify-end bg-slate-100">
                                            <button value="no" className="btn-navbar" onClick={() => setSure(false)}>No</button>
                                            <button value="si" className="btn-navbar" onClick={handleSubmit} variant="primary" >Sí</button>
                                        </div>
                                    </div>
                                </div>
                            </>)}
                        </div>
                    </> : <>
                        <div className="flex justify-center items-center bg-white w-full h-screen">
                            <div className="flex justify-center">
                                <Image src={loader} width={600} height={300} alt="loading"/>
                            </div>
                        </div>
                    </>
                    }
            </div>
        </Layout>)
    }
    return <p>Access Denied</p>; 
}

export default userDetail;