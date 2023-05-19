import { gas, obrero, llave, foco, manguera, tubo } from "@public/assets";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

export default function HomeSlider() {
  return (
    <div className="w-full flex flex-row items-center justify-center gap-20a my-16 gap-12">
      <Link href="/" className="homeIconItemArrow mb-5">
        <FiArrowLeft />
      </Link>

      <Link href="/" className="homeIconItemWrap group">
        <Image src={gas} className="homeIconItem" alt="logo_gas" />
        <h3 className="text-gray-500/0 group-hover:text-gray-500 duration-300">Gasista</h3>
      </Link>

      <Link href="/" className="homeIconItemWrap group">
        <Image src={obrero} className="homeIconItem" alt="logo_obrero" />
        <h3 className="text-gray-500/0 group-hover:text-gray-500 duration-300">Contructor</h3>
      </Link>

      <Link href="/" className="homeIconItemWrap group">
        <Image src={llave} className="homeIconItem" alt="logo_llave" />
        <h3 className="text-gray-500/0 group-hover:text-gray-500 duration-300">Mecanico</h3>
      </Link>

      <Link href="/" className="homeIconItemWrap group">
        <Image src={foco} className="homeIconItem" alt="logo_foco" />
        <h3 className="text-gray-500/0 group-hover:text-gray-500 duration-300">Electricista</h3>
      </Link>

      <Link href="/" className="homeIconItemWrap group">
        <Image src={manguera} className="homeIconItem" alt="logo_manguera" />
        <h3 className="text-gray-500/0 group-hover:text-gray-500 duration-300">Jardinero</h3>
      </Link>

      <Link href="/" className="homeIconItemWrap group">
        <Image src={tubo} className="homeIconItem" alt="logo_tubo" />
        <h3 className="text-gray-500/0 group-hover:text-gray-500 duration-300">Plomero</h3>
      </Link>

      <Link href="/" className="homeIconItemArrow mb-5">
        <FiArrowRight />
      </Link>
    </div>
  );
}
