import Footer from "@components/Footer";
import Layout from "@components/Layout";
import Image from "next/image";
import { useWorkers } from "@context/WorkersContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { loader } from "@public/assets";
import Link from "next/link";
import { useUser } from "@context/UserContext";

export default function WorkDetail() {
  const { workDetail, setWorkDetail, getJobReqs, setSaveData } = useWorkers();
  const router = useRouter();
  const { id } = router.query;
  const { userData } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userData._id) {
          await getJobReqs(id);
        }
      } catch (error) {
        console.error("Error en la solicitud Axios:", error);
      }
    };
    fetchData();

    return setWorkDetail([]);
    //eslint-disable-next-line
  }, []);

  const sendWorkInfo = () => {
    setSaveData(workDetail)
  };

  return (
    <Layout>
      {workDetail.title ? (
        <>
          <div className="font-bold text-3xl flex justify-center items-center mt-10">
            Detalle de oferta seleccionada
          </div>
          <div className="flex justify-center items-center mt-10 ">
            <div class="flex justify-around bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-10">
              <div className="flex flex-col justify-around">
                <h2 className="mb-3 font-bold text-2xl">{workDetail.title}</h2>
                <h3 onClick={()=> console.log(workDetail)} className="mb-2">
                  Información del trabajo: {workDetail.description}
                </h3>
                <p className="mb-2">- Ubicación: {`${workDetail.address[0].street}, ${workDetail.address[0].city}, ${workDetail.address[0].state}, ${workDetail.address[0].country}`}</p>
                <p className="mb-2">- Código Postal: {workDetail.address[0].zipCode}</p>
                <p className="mb-2">- Fecha: {workDetail.date.slice(0, 10)}</p>
                <p className="mb-2">
                  - Destinado para: {workDetail.type[0].name}
                </p>
                <p className="font-bold mb-2">Contacto</p>
                <p>- E-mail: {workDetail.employer[0].email}</p>
                <p>- Phone: {workDetail.employer[0].phone}</p>
                <p className="mb-2 mt-2 font-bold">Publicado por {workDetail.employer[0].name}</p>
                <div className="flex justify-center items-center space-x-8 mt-5">
                  <Link href="/jobpostulations" onClick={sendWorkInfo}>
                    <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                      Postularme
                    </button>
                  </Link>
                  <Link href="/HomeWorker">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                      Volver
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div onClick={()=> console.log(workDetail)} className="flex justify-center">
          <Image src={loader} width={600} height={300} alt="loading" />
        </div>
      )}
      <Footer />
    </Layout>
  );
}
