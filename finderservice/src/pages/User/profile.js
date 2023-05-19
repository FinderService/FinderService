import Footer from "@components/Footer"
import Layout from "@components/Layout"
import FormPassword from "@components/User/formpassword"

export default function Profile() {
    return(
        <Layout>
            <div className="contentCentered">
                 <div className="w-2/3 flex flex-row border-2 border-gray-100 shadow-lg rounded-md p-4">
                    <div className="w-1/2">
                        form data
                    </div>
                    <div className="w-1/2">
                        <div>
                            form avatar
                        </div>
                        <div>
                            <h3>Actualizar Contraseña</h3>
                            <FormPassword />
                        </div>
                    </div>
                 </div>
            </div>
            <Footer />
        </Layout>
    )
}