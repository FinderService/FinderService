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
                    <Image src={gas} />
            </Link>
 
            <Link href="/" className='homeIconItem'>
                    <Image src={obrero} />
            </Link>
  
            <Link href="/" className='homeIconItem'>
                    <Image src={llave} />
            </Link>
   
            <Link href="/" className='homeIconItem'>
                    <Image src={foco} />
            </Link>
    
            <Link href="/" className='homeIconItem'>
                    <Image src={manguera} />
            </Link>
     
            <Link href="/" className='homeIconItem'>
                    <Image src={tubo} />
            </Link>

            <Link href="/" className='homeIconItemArrow'>
                <FiArrowRight />
            </Link>

        </div>
    );
}