
import { useState } from "react";
import { GoStar } from "react-icons/go";
import { IoIosStarOutline } from "react-icons/io";
import Layout from "@components/Layout";
import Footer from "@components/Footer";
import { useWorkers } from "@context/WorkersContext";
import { useWorker } from "@context/HomeEmployerContext";

function ReviewsWorker() {
  const { setEmployerReviews, } = useWorkers();
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState();
  const {savedID} = useWorker();

  const [formData, setFormData] = useState({
    jobId: savedID,
    reviewEmployer: "",
    ratingEmployer: ""
  })

  const fillStars = (count) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
      stars.push(i);
    }
    return stars;
  };

  const handleStarClick = (index) => {
    setRating(index);
    setFormData({ ...formData, ratingEmployer: index });
  };

  const handleReviewSubmit = (event) => {
    event.preventDefault();
    //setEmployerReviews({ ...formData });
    console.log(formData);
    console.log(savedID)
  };

  const handleOnChange = (e) => {
    setFormData({...formData, jobId: savedID});
    if(e.target.name === 'reviews'){
      setFormData({ ...formData, reviewEmployer: e.target.value });

    }
    //console.log(reviews)
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center">
        <div className="text-blue-500 font-bold text-3xl mb-4 text-center">
          Opiniones
        </div>
        <label className="text-black font-bold mb-4 text-center">
          ¡Opina y ayuda a más personas!
        </label>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        />

        <div className="bg-neutral-300 p-7 mt-5 rounded-xl duration-200 hover:scale-105">
          <p className="text-black font-bold text-3xl mb-4 text-center">
          ¿Qué te pareció la interacción del contratante?
          </p>
          <div className="flex justify-center mt-4 space-x-4">
            {[1, 2, 3, 4, 5].map((index) => (
              <div
                key={index}
                className={`flex flex-col items-center ${
                  index <= rating ? "text-blue-500" : ""
                }`}
                onClick={() => handleStarClick(index)}
              >
                {index <= rating ? (
                  <GoStar className="text-3xl" />
                ) : (
                  <IoIosStarOutline className="text-3xl" />
                )}
                <span className="text-sm mt-2">
                  {index === 1 ? "Malo" : index === 5 ? "Excelente" : ""}
                </span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-black font-bold text-xl mt-12 mb-0 text-center">
          Cuéntanos más acerca de este empleador
        </p>

        <form onSubmit={handleReviewSubmit} className="mt-8 w-full max-w-lg">
          <div className="flex flex-col items-center">
            <textarea
              className="h-40 md:h-150 border border-gray-400 p-4 md:p-15 text-base outline-none mx-auto w-1/2"
              name="reviews"
              type="text"
              placeholder="Deja tu opinión sobre el trato y las condiciones con el empleador y puntúalo..."
              onChange={handleOnChange}
            />

            <div className="flex mt-4">
              {fillStars(5).map((str, index) => (
                <label key={str} className="cursor-pointer">
                  <input
                    type="radio"
                    value={str}
                    onClick={() => handleStarClick(index + 1)}
                    name="stars"
                    className="hidden"
                  />
                  <IoIosStarOutline
                    className={`text-gray-400 ${
                      index < rating ? "text-blue-500" : ""
                    }`}
                    id={str}
                    style={{ fontSize: "32px" }}
                  />
                </label>
              ))}
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 mt-4 text-2xl rounded-full hover:scale-110 transition duration-300"
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </Layout>
  );
}

export default ReviewsWorker;

