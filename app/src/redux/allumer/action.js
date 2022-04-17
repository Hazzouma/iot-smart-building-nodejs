import axios from "axios";
import {
  OPEN,
  LOAD,
  CLOSE,
  RESULT_CLIM,
  VIDE_ERRORS,
  MODE_NORMAL,
  MODE_SECURITE,
  CHANGE_NORMAL,
  CHANGE_SECURITE,
} from "../actionTypes";
const ENDPOINT = process.env.PUBLIC_URL;

export const doThing = (whatToDo) => async (dispatch) => {
  dispatch({ type: LOAD });
  try {
    let result = await axios.post(`${ENDPOINT}/api/switch`, {
      whatToDo,
    });
    if (whatToDo === "mode sécurité") dispatch({ type: MODE_SECURITE, payload: result.data });
    else if (whatToDo === "mode normal") dispatch({ type: MODE_NORMAL, payload: result.data });
    else dispatch({ type: RESULT_CLIM, payload: result.data });
  } catch (error) {
    console.log(error);
  }
};

export const viderError = () => (dispatch) => {
  dispatch({ type: VIDE_ERRORS });
};

//change mode app
export const changeMode = (info) => async (dispatch) => {
  console.log(info);
  info === "normal" ? dispatch({ type: CHANGE_NORMAL }) : info === "sécurité" && dispatch({ type: CHANGE_SECURITE });
};
