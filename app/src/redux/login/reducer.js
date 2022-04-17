import {
  LOGIN,
  FAIL_LOGIN,
  LOAD,
  RESET_LOGIN,
  CURRENT_USER,
  LOGOUT_USER,
} from "../actionTypes";

const initalState = {
  load: false,
  user: {},
  errors: [],
  msg: "",
};

const userReducer = (state = initalState, { type, payload }) => {
  switch (type) {
    case LOAD:
      return {
        ...state,
        load: true,
      };
    case CURRENT_USER:
      return {
        ...state,
        user: payload.user,
        load: false,
        msg: payload.msg,
      };
    case LOGIN:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        load: false,
        user: payload.userLogged,
      };
    case LOGOUT_USER:
      localStorage.removeItem("token");
      return { ...state, user: {}, load: false };
    case FAIL_LOGIN:
      return {
        ...state,
        errors: payload,
        load: false,
      };
    case RESET_LOGIN:
      return {
        ...state,
        errors: [],
        msg: "",
        load: false,
      };
    default:
      return state;
  }
};

export default userReducer;
