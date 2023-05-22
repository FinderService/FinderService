import Image from "next/image";
import { logo, equipo } from "@public/assets";
import Link from "next/link";
import { useRouter } from "next/router";
import Login from "./User/login";
import { useUser } from "@context/UserContext";


export default function Navbar() {

  const router = useRouter();
  const showBtns = router.pathname.indexOf("User") > -1 ? false : true;
  const { userData } = useUser();

  const handleAction = () =>{
    localStorage.setItem('redirectUrl', router.asPath);
    alert("Usuario: Debe iniciar sesión o registrarse para realizar esta acción.")
    router.push('/User/login');
  }

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
        {showBtns && (!userData.profile ?
          <>
            <button onClick={handleAction} className="btn-navbar">
              <Image src={equipo} alt="icon_equipo" />


              <Link href="jobpostulations">Postulá tu empleo</Link>

              <p>Postulate a un empleo</p>


              <p>Postulate a un Empleo</p>

            </button>
            <button onClick={handleAction} className="btn-navbar hover:border-green-500">
              <Image src={equipo} alt="icon_equipo" />
              <p>Publica tu Servicio</p>
            </button>
          </> : (userData.profile === 'employer')?            
            <button className="btn-navbar hover:border-green-500">
              <Image src={equipo} alt="icon_equipo" />


              <Link href="jobrequests">Postulá tu contratación</Link>

              <Link href="contratar">Publica tu empleo</Link>

              <Link href="contratar">Publica tu Servicio</Link>

            </button>
            :
            <button className="btn-navbar">
              <Image src={equipo} alt="icon_equipo" />

              <Link href="trabajar">Postulate a un empleo</Link>


              <Link href="trabajar">Postulate a un Empleo</Link>

            </button>
        )}
            <Login />
          </div>
      </div>
    </div>
  );
}
