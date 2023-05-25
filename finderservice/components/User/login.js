"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoIosLogOut,
  IoIosContact,
} from "react-icons/io";
import Image from 'next/image'

// para cargar la data del usuario al estado global
import { useUser } from "@context/UserContext";

export default function Login() {
  const { userData, updateUserData } = useUser();

  const [showMenu, setShowMenu] = useState(false);
  const { data: session } = useSession();
  console.log(session);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/User/login" });
  };

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (session && userData) {
      updateUserData(session.user.email);
    }
    //eslint-disable-next-line
  }, [session]);

  return (
    <div>
      {session?.user ? (
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-row items-center gap-2">
            <div className="border-2 rounded-full overflow-hidden border-green-500">
              {session.user?.image && (
                <Image
                  src={session.user.image}
                  alt="user_avatar"
                  className="w-10"
                  width="100"
                  height="100"
                />
              )}
              {session.user?.profilepic && (
                <Image
                  src={session.user.profilepic}
                  alt="user_avatar"
                  className="w-10"
                />
              )}
            </div>

            <Link
              href=""
              onClick={handleShowMenu}
              className="flex flex-row gap-2 items-center hover:text-gray-600 duration-300 group"
            >
              {session.user?.name}
              <span className="group-hover:text-blue-600">
                {showMenu ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </span>
            </Link>
          </div>
          {showMenu && (
            <div className="fixed bg-white w-[10rem] mt-[4rem] shadow-md rounded-md overflow-hidden">
              <ul>
                <Link href="/User/profile">
                  <li className="navDropLink">
                    <span className="text-blue-800 text-xl">
                      <IoIosContact />
                    </span>
                    Perfil
                  </li>
                </Link>
                <Link href="" onClick={handleSignOut}>
                  <li className="navDropLink">
                    <span className="text-red-800 text-xl">
                      <IoIosLogOut />
                    </span>{" "}
                    Salir
                  </li>
                </Link>
              </ul>
            </div>
          )}
        </div>
      ) : (
        /* <Link href="User/login"> Iniciar sesión / Registrarse</Link> */
        <button onClick={() => signIn()}>Iniciar sesión / Registrarse</button>
      )}
    </div>
  );
}
