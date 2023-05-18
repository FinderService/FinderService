import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function Login() {

    const [ showMenu, setShowMenu] = useState(false);
    const { data: session } = useSession();
    //console.log(session);

    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/User/login' });
    }

    const handleShowMenu = () => {
        setShowMenu( !showMenu );
    }

    return <div>
        {
            session?.user ? (
                <div className="flex flex-col items-center gap-4">
                    <div className="flex flex-row items-center gap-2">
                        <div className="border-2 rounded-full overflow-hidden border-green-500">
                            { session.user?.image &&
                                <img src={ session.user.image} alt="user_avatar" className="w-10" width="100" />             
                            }
                            { session.user?.profilepic &&
                                    <img src={ session.user.profilepic } alt="user_avatar" className="w-10" />             
                            }
                        </div>
                        <Link href="" onClick={ handleShowMenu } className="flex flex-row gap-2 items-center hover:text-gray-600 duration-300 group">
                            { session.user?.name }  { session.user?.last_name } 
                            <span className="group-hover:text-blue-600">
                                { showMenu ? (
                                    <IoIosArrowUp />
                                    ):(
                                    <IoIosArrowDown />
                                )}
                            </span>
                        </Link>
                    </div>
                    {
                        showMenu &&    
                    <div className="fixed bg-white w-[10rem] mt-[4rem] shadow-md rounded-md overflow-hidden">
                        <ul>
                            <Link href="" >
                                <li className="navDropLink">
                                    Perfil
                                </li>
                            </Link>
                            <Link href=""  onClick={ handleSignOut }> 
                                <li className="navDropLink">
                                    Salir 
                                </li>
                            </Link>
                        </ul>
                    </div>
                    }
                </div>
            ) : (

                /* <Link href="User/login"> Iniciar sesión / Registrarse</Link> */
                <button onClick={() => signIn() }>Iniciar sesión / Registrarse</button>
            )
        }

    </div>
}