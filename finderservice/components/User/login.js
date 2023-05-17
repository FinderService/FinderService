import { signIn, signOut, useSession } from "next-auth/react";
import { avt } from "@public/assets";
import Image from "next/image";
//import Link from "next/link";

export default function Login() {

    const { data: session } = useSession();
    console.log(session);

    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/User/login' });
    }

    return <div>
        {
            session?.user ? (
                <div className="flex flex-row items-center gap-4">
                    <div className="flex flex-row items-center gap-2">
                        <div className="border-2 rounded-full overflow-hidden border-green-500">
                            { session.user?.image &&
                                <img src={ session.user.image} alt="user_avatar" className="w-10" width="100" />             
                            }
                            { session.user?.profilepic &&
                                    <img src={ session.user.profilepic } alt="user_avatar" className="w-10" />             
                            }
                        </div>
                        <div>
                            { session.user?.name }
                        </div>
                    </div>
                    <button className="text-sm link" onClick={ handleSignOut }> Salir </button>
                </div>
            ) : (

                /* <Link href="User/login"> Iniciar sesión / Registrarse</Link> */
                <button onClick={() => signIn() }>Iniciar sesión / Registrarse</button>
            )
        }

    </div>
}