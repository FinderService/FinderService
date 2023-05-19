import Footer from "@components/Footer";
import Layout from "@components/Layout";
import FormPassword from "@components/User/formpassword";
import FormData from "@components/User/formData";
import { useUser } from "@context/UserContext";
import { useState } from "react";

export default function Profile() {

    const { userData } = useUser();

    return(
        <Layout>
            <div className="contentCentered">
                 <div className="w-2/3 flex flex-row border-2 border-gray-100 shadow-lg rounded-md p-4">
                    <div className="w-1/2">
                        <FormData 
                            name={userData.name}
                            email={userData.email}
                            birthdate={userData.birthdate}
                            phone={userData.phone}
                            id={userData._id}
                        />
                    </div>
                    <div className="w-1/2">
                        <div>
                            form avatar
                        </div>
                        <div>
                            <h3>Actualizar Contraseña</h3>
                            <FormPassword id={ userData._id } />
                        </div>
                    </div>
                 </div>
            </div>
            <Footer />
        </Layout>
    )
}