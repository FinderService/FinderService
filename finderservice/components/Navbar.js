import Image from 'next/image';
import { logo, equipo } from '@public/assets';
import Link from 'next/link';
import { useRouter } from "next/router";


export default function Navbar(){

    const router = useRouter();
    const showBtns = router.pathname.indexOf('User') > -1 ? false : true ;

    return(
        <div
            className="w-full shadow-navbarShadow h-20 lg:h{12vh} sticky top-0 z-50 backdrop-blur-md bg-bodyColor/60 px-4"
        >
            <div className="max-w-container h-full mx-auto py-1 font-titleFont flex items-center justify-between">
                <div className='flex flex-row items-center'>
                    <Image 
                        src={ logo }
                        className='w-[9rem]'
                        alt='logo_app'
                    />
                    <Link href='/' className='text-xl font-bold text-slate-700'>
                        Finder Service
                    </Link>
                </div>
                {
                    showBtns &&
                <div className="hidden mdl:inline-flex items-center gap-7 ">

                    <button className="btn-navbar"> 
                        <Image src={equipo} alt="icon_equipo" />     
                        <Link href='trabajar'>Postulá tu empleo</Link> 
                    </button>

                    <button className="btn-navbar hover:border-green-500"> 
                        <Image src={equipo} alt="icon_equipo" />     
                        <Link href='contratar'>Postulá tu contratación</Link> 
                    </button>

  

                    <Link href='/User/login'> Iniciar sesión / Registrarse</Link>
                </div>
                }
            </div>
        </div>
    )
}