import { useAdmin } from "@context/AdminContext";
import { useEffect } from "react";
import Image from "next/image";

const SliderUsers = ({ tit1, tit2 ,users , workers , employers, clickOnUser}) =>{
    const { setUsersInfo } = useAdmin();

    useEffect(()=>{
        const fetchData = async () => {
            try {
                if(users.length){
                    await setUsersInfo();
                }
            } catch (error) {
                console.error('Error en la solicitud Axios:', error);
            }
        };
        fetchData();
    //eslint-disable-next-line
    },[users])

    return (
    <div className="mt-10 mb-10 flex justify-around">
        <div className="bg-yellow-100 rounded-xl p-5 w-2/5 flex flex-col">
            <p className="font-bold">{tit1}</p>
            <div className="flex">
                <input name="workers" className="w-5/6 mt-3 mb-3 rounded"/>
                <button className="pl-5">Buscar</button>
            </div>
            <div className="bg-slate-100 max-h-96 overflow-y-auto">
                {workers.map((item)=>{
                    return(<>
                    <div onClick={()=> clickOnUser(item)} className="pl-5 mt-3 mb-3 flex hover:bg-blue-500 hover:cursor-pointer" key={item.name}>
                        <Image src={item.profilepic} width={50} height={50} alt="profile"/>
                        <div className="pl-5 flex-col">
                            <p>{item.name}</p>
                            <p>{item.email}</p>
                        </div>
                    </div>
                    </>)}                                   
                )}
            </div>
        </div>
        <div className="bg-lime-100 rounded-xl p-5 w-2/5 flex flex-col">
            <p className="font-bold">{tit2}</p>
            <div className="flex">
                <input name="employers" className="w-5/6 mt-3 mb-3 rounded"/>
                <button className="pl-5">Buscar</button>
            </div>
            <div className="bg-slate-100 max-h-96 overflow-y-auto">
                {employers.map((item)=>{
                    return(<>
                        <div onClick={()=> clickOnUser(item)} className="pl-5 mt-3 mb-3 flex hover:bg-blue-500 hover:cursor-pointer" key={item.name}>
                            <Image src={item.profilepic} width={50} height={50} alt="profile"/>
                            <div className="pl-5 flex-col">
                                <p>{item.name}</p>
                                <p>{item.email}</p>
                            </div>
                        </div>
                        </>)
                })}
            </div>
        </div>
    </div>)
}

export default SliderUsers;