import { combineReducers } from "redux";
import {CREATE_POSTULATION} from "./actions-Type";

// Define el estado inicial de tu aplicación
const initialState = {
  allPostulations : [],
};



// Reducer para manejar las acciones relacionadas con el usuario
 const postulationReducer = (state = initialState.postulation, action) => {
  switch (action.type) {
      case CREATE_POSTULATION:
            return {
                ...state
            }
    default:
      return { ...state };
  }
}; 

// Combina los reducers en un único reducer raíz
const rootReducer = combineReducers({
 postulation: postulationReducer, 
});

export default rootReducer;


