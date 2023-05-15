import { AiOutlineCheckCircle } from 'react-icons/ai';

export default function Alert({ msg }) {
    return <div className='w-full h-screen z-50 absolute pt-[10rem] flex flex-col items-center justify-start gap-4'>
        <div className='bg-white flex flex-row  items-center gap-4'>

        <div className='p-2 bg-green-700 text-3xl text-white'>
            <AiOutlineCheckCircle />
        </div>
        <div className='pr-4'>
            Lorem ipsum et sit amet
        </div>
        </div>
    </div>
}