import Image from "next/image";
import { logo, equipo } from "@public/assets";
import Link from "next/link";
import { useRouter } from "next/router";
import Login from "./User/login";
import { useSession } from "next-auth/react";
import { useUser } from "@context/UserContext";
import { useEffect } from "react";


export default function Navbar() {

  const router = useRouter();
  const showBtns = router.pathname.indexOf("User") > -1 ? false : true;
  const { data: session } = useSession();
  const { userData } = useUser();

  const handleAction = () =>{
    localStorage.setItem('redirectUrl', JSON.stringify(router.asPath));
    alert("Usuario: Debe iniciar sesión o registrarse para realizar esta acción.")
    router.push('/User/login');
  }

  useEffect(() => {
    let socialLogin = localStorage.getItem('socialLogin');
    const actualUrl = router.pathname;
    if( actualUrl !== '/User/registerSocial' && socialLogin){
      console.log('No ha completado el registro social, redirigiendo...');
      router.push('/User/registerSocial');
    }
    console.log('Ruta actual: ', actualUrl);
  }, [])

  return (
    
    <div className="w-full shadow-navbarShadow h-20 lg:h{12vh} sticky top-0 z-50 backdrop-blur-md bg-bodyColor/60 px-4">
      <div className="max-w-container h-full mx-auto py-1 font-titleFont flex items-center justify-between">
        <div className="flex flex-row items-center">
          <Image src={logo} className="w-[9rem]" alt="logo_app" />
          <Link href="/" className="text-xl font-bold text-slate-700">
            Finder Service
          </Link>
        </div>
        
        <div className="hidden mdl:inline-flex items-center gap-7 ">
          {showBtns && (!session?.user ?
          <>
            <button onClick={handleAction} className="btn-navbar">
              <Image src={equipo} alt="icon_equipo" />
              <p>Postulá tu empleo</p>
            </button>

            <button onClick={handleAction}  className="btn-navbar hover:border-green-500">
              <Image src={equipo} alt="icon_equipo" />
              <p>Postulá tu contratación</p>
            </button>
            
          </> : (userData.profile === 'employer')? <>       
            <button className="btn-navbar hover:border-green-500">
              <Image src={equipo} alt="icon_equipo" />
              <Link href="jobrequests">Postulá tu contratación</Link>
            </button> 
          </> : <>
          <button className="btn-navbar hover:border-blue-500">
              <Image src={equipo} alt="icon_equipo" />
              <Link href="jobpostulations">Postulá tu empleo</Link>
            </button>
          </>)
          }
          <Login/>
        </div>
      </div>
    </div>
  );
}