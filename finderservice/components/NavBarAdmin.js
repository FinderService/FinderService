import Link from "next/link";

const NavBarAdmin = () =>{
    return (
    <div className="bg-slate-500 w-56 h-full">
        <div className="w-48 mt-10 fixed">
            <p className="pl-4 mb-3 font-bold">Navigation</p>
            <Link href="/HomeAdmin"><h1 className="pl-5 pt-1 h-9 hover:bg-blue-500">🏠 Home</h1></Link>
            <Link href="/HomeAdmin/Usuarios"><h1 className="pl-5 pt-1 h-9 hover:bg-blue-500">👥 Usuarios</h1></Link>
            <Link href="/HomeAdmin/Comments"><h1 className="pl-5 pt-1 h-9 hover:bg-blue-500">💬 Comentarios</h1></Link>
            <Link href="/HomeAdmin/Jobs"><h1 className="pl-5 pt-1 h-9 hover:bg-blue-500">🗂️ Trabajos</h1></Link>
        </div>
    </div>)
}

export default NavBarAdmin;