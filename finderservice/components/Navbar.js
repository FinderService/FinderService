import Image from 'next/image';
import { logo, equipo } from '@public/assets';


export default function Navbar(){
    return(
        <div
            className="w-full shadow-navbarShadow h-20 lg:h{12vh} sticky top-0 z-50 backdrop-blur-md bg-bodyColor/60 px-4"
        >
            <div className="max-w-container h-full mx-auto py-1 font-titleFont flex items-center justify-between">
                <div className='flex flex-row items-center'>
                    <Image 
                        src={ logo }
                        className='w-[9rem]'
                    />
                    <div className='text-xl font-bold text-slate-700'>
                        Finder Service
                    </div>
                </div>
                <div className="hidden mdl:inline-flex items-center gap-7 ">
                    <button
                        className="border-2 border-slate-400 rounded-md px-3 py-1 hover:border-blue-600 cursor-pointer duration-300 nav-link flex flex-row gap-2 items-center"
                    > 
                        <Image src={equipo} />     
                        Registra tu rubro de trabajo 
                    </button>
                </div>
            </div>
        </div>
    )
}