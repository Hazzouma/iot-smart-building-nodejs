import {
  LOAD,
  OPEN,
  CLOSE,
  RESULT_CLIM,
  VIDE_ERRORS,
  MODE_NORMAL,
  MODE_SECURITE,
  CHANGE_SECURITE,
  CHANGE_NORMAL,
} from "../actionTypes";

const initialState = {
  load: false,
  openedLight1: null,
  mode: "normal",
  msg: "",
};

const etatPiece = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD:
      return { ...state, load: true };
    case OPEN:
      return { ...state, load: false, openedLight1: true, msg: payload.msg };
    case CLOSE:
      return { ...state, load: false, openedLight1: false, msg: payload.msg };
    case MODE_NORMAL:
      return { ...state, load: false, msg: payload.msg, mode: "normal" };
    case MODE_SECURITE:
      return { ...state, load: false, msg: payload.msg, mode: "sécurité" };
    case CHANGE_NORMAL:
      return { ...state, load: false, mode: "normal" };
    case CHANGE_SECURITE:
      return { ...state, load: false, mode: "sécurité" };
    case RESULT_CLIM:
      return {
        ...state,
        load: false,
        msg: payload.msg,
      };
    case VIDE_ERRORS:
      return { ...state, load: false, msg: "" };
    default:
      return state;
  }
};

export default etatPiece;
