import Layout from "@components/Layout";
import NavBarAdmin from "@components/NavBarAdmin";
import { useSession } from "next-auth/react";

const HomeAdmin = () =>{    
    const { data: session } = useSession();

    if (session) {
        return (
        <Layout >
            <div className="flex justify-start">
                <NavBarAdmin />
                <div className="bg-stone-800 w-full">
                    
                </div>
            </div>
        </Layout>);
    }
   return <p>Access Denied</p>; 
}

export default HomeAdmin;