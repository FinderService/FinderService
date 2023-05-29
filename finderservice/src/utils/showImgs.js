import { gas, obrero, manguera, tubo , cerrajero, carpintero, pintura, ninera, limpieza, electricista } from '@public/assets';

const showImgs = () =>{

    const objImgs = [{
        id: "0",
        img: tubo,
        work: "Plomero"
    },{
        id: "1",
        img: obrero,
        work: "Constructor"
    },{
        id: "2",
        img: electricista,
        work: "Electricista"
    },{
        id: "3",
        img: manguera,
        work: "Jardinero"
    },{
        id: "4",
        img: gas,
        work: "Gasero"
    },{
        id: "5",
        img: limpieza,
        work: "Limpiador de casa"
    },{
        id: "6",
        img: pintura,
        work: "Pintor"
    },{
        id: "7",
        img: cerrajero,
        work: "Cerrajero"
    },{
        id: "8",
        img: carpintero,
        work: "Carpintero"
    },{
        id: "9",
        img: ninera,
        work: "Niñera"
    }]
    

    return objImgs;
}

export default showImgs;