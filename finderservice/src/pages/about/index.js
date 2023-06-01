import Style from "./about.module.css";
import Navbar from "../../../components/Navbar"

const About = () => {
  const us = [
   
    {
      sw: false,
      name: "Nico Paua",
      para: "desarrollador web - desarrollador web Front-end React",
      img: "https://res.cloudinary.com/dnmj2uz5i/image/upload/v1685587754/ad69c720-7b15-4650-a542-56ac208ab02f_xroks9.jpg",
    },
    {
      sw:true,
      name: "Agustin Pieve",
      para: "desarrollador web - desarrollador web Front-end React",
      img: "https://res.cloudinary.com/dnmj2uz5i/image/upload/v1685587962/a7b6880b-8fc3-46c7-926b-b1142deb3f19_l3zqvd.jpg",
    },
    {
      sw: false,
      name: "Camilo",
      para: "desarrollador web - desarrollador web Front-end React",
      img: "https://res.cloudinary.com/dnmj2uz5i/image/upload/v1685588019/0f67f96b-beab-4c31-8de2-f4ce5030f614_hhrcyc.jpg",
    },
     {
        sw: true,
        name: "Wiliams B",
        para: "desarrollador web - desarrollador web Front-end React",
        img: "https://res.cloudinary.com/dnmj2uz5i/image/upload/v1685587634/35cf5a74-95f2-4ae2-bf15-98540fc2ea0d_ioztpg.jpg",
      },
    {
      sw:false,
      name: "Nahir Maresca",
      para: "desarrollador web - desarrollador web Front-end React",
      img: "https://res.cloudinary.com/dnmj2uz5i/image/upload/v1685588127/e3b6ba09-578d-4069-9721-3f65e46480d0_yk25m5.jpg",
    },
    {
        sw:true,
        name: "Odalis",
        para: "desarrollador web - desarrollador web Front-end React",
        img: "https://res.cloudinary.com/dnmj2uz5i/image/upload/v1685588898/183528778_871828446733392_1166143320282881155_n_zqhhqm.jpg",
      },
  ];

  return (
    <>
    <Navbar />
    <div className={Style.container_about}>
      {us.map((x) => {
        return (
          <div className={ x.sw ? Style.container_about_container_cards : Style.container_about_container_cardsA}>
            <div className={Style.container_about_container_cards_img}>
              <img
                className={Style.img}
                src={x.img}
                alt="Picture of the author"
              />
            </div>
            <div className={Style.container_about_container_cards_data}>
              <h2 className={Style.container_about_container_cards_data_name}>
                {x.name}
              </h2>
              <p
                className={Style.container_about_container_cards_data_paragrath}
              >
                {x.para}
              </p>
              <div className={Style.container_about_container_cards_data_bts}>
                <button onClick={() => alert(`Github from ${x.name}`)}>
                  Github
                </button>
                <button onClick={() => alert(`portafolio from ${x.name}`)}>
                  Portafolio
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
    </>
  );
};

export default About;
