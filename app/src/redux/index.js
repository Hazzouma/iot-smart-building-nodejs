import { combineReducers } from "redux";
import userReducer from "./login/reducer";
import etatPiece from "./allumer/reducer";

const rootReducer = combineReducers({ userReducer, etatPiece });
export default rootReducer;
