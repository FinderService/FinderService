import Layout from "@components/Layout";
import NavBarAdmin from "@components/NavBarAdmin";
import { useSession } from "next-auth/react";

const UsersAdmin = () =>{    
    const { data: session } = useSession();

    if (session) {
        return (
        <Layout >
            <div className="flex justify-start">
                <NavBarAdmin />
                <div className="bg-stone-800 w-full">
                    <h1>Holaa</h1>
                </div>
            </div>
        </Layout>);
    }
   return <p>Access Denied</p>; 
}

export default UsersAdmin;