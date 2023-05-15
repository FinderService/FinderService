import { gas, obrero, llave, foco, manguera, tubo } from '@public/assets';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

export default function HomeSleider() {
    return(
        <div 
            className='w-full flex flex-row items-center justify-center gap-20a my-16 gap-12'
        >

            <Link href="/" className='homeIconItemArrow'>
                <FiArrowLeft />
            </Link>
 

            <Link href="/" className='homeIconItem'>
                    <Image src={gas} alt='logo_gas' />
            </Link>
 
            <Link href="/" className='homeIconItem'>
                    <Image src={obrero} alt='logo_obrero' />
            </Link>
  
            <Link href="/" className='homeIconItem'>
                    <Image src={llave} alt='logo_llave' />
            </Link>
   
            <Link href="/" className='homeIconItem'>
                    <Image src={foco} alt='logo_foco'/>
            </Link>
    
            <Link href="/" className='homeIconItem'>
                    <Image src={manguera} alt='logo_manguera' />
            </Link>
     
            <Link href="/" className='homeIconItem'>
                    <Image src={tubo} alt='logo_tubo' />
            </Link>

            <Link href="/" className='homeIconItemArrow'>
                <FiArrowRight />
            </Link>

        </div>
    );
}