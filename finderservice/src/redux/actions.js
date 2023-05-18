import axios from "axios";
import {CREATE_POSTULATION} from "./actions-Type";


export const createPostulation = () => {
    return async (dispatch) => {
      try {
        const { data } = await axios.post(
          `/trabajar`,
        
        );
        alert("Felicidades, su portulación fue creada exitosamente.");
        return dispatch({
          type: CREATE_POSTULATION,
          payload: data,
        });
  
      } catch (err) {
        alert("Disculpe, su postulación no pudo ser creada.");
      }
    };
  }; 

  

  