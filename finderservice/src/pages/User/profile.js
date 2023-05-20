import Footer from "@components/Footer";
import Layout from "@components/Layout";
import FormPassword from "@components/User/formpassword";
import FormData from "@components/User/formData";
import { useUser } from "@context/UserContext";
import FormAvatar from "@components/User/formAvatar";

export default function Profile() {

    const { userData } = useUser();

    return(
        <Layout>
            <div className="contentCentered">
                 <div className="w-2/3 flex flex-row items-center gap-6">
                    <div className="w-1/2 border-2 border-gray-100  shadow-xl rounded-md">
                        <FormData 
                            name={userData.name}
                            email={userData.email}
                            birthdate={userData.birthdate}
                            phone={userData.phone}
                            id={userData._id}
                        />
                    </div>
                    <div className="w-1/2 flex flex-col gap-6">
                        <div className="border-2 border-gray-100  shadow-xl rounded-md">
                            <FormAvatar id={ userData._id} image={ userData.profilepic } />
                        </div>
                        <div className="border-2 border-gray-100  shadow-xl rounded-md">
                            <FormPassword id={ userData._id } />
                        </div>
                    </div>
                 </div>
            </div>
            <Footer />
        </Layout>
    )
}