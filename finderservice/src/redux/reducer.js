import { combineReducers } from "redux";
import {CREATE_POSTULATION, GET_USER_DATA} from "./actions-Type";

// Define el estado inicial de tu aplicación
const initialState = {
  allPostulations : [],
  userData: [],
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

const userReducer = (state = initialState, action) => {

    const { type, payload } = action;

    switch(type){

      case GET_USER_DATA:
        return{
          ...state,
          userData: payload,
        }
      default:
        return { ...state }

    }
}



// Combina los reducers en un único reducer raíz
const rootReducer = combineReducers({
 postulation: postulationReducer, 
 userReducer,
});

export default rootReducer;


