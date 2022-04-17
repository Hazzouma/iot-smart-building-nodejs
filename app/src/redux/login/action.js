import axios from "axios";

const { LOGIN, FAIL_LOGIN, LOAD, RESET_LOGIN, CURRENT_USER, LOGOUT_USER } = require("../actionTypes");
const ENDPOINT = process.env.PUBLIC_URL;

export const resetLogin = () => (dispatch) => {
  dispatch({ type: RESET_LOGIN });
};

export const logout = () => {
  window.location.href = `/`;
  return {
    type: LOGOUT_USER,
  };
};

export const login = (user) => async (dispatch) => {
  dispatch({ type: LOAD });
  try {
    let result = await axios.post(`${ENDPOINT}/api/user/login`, user);
    dispatch({ type: LOGIN, payload: result.data });
    if (result.data.token) {
      localStorage.setItem("token", result.data.token);
      window.location.href = `/dashboard`;
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: FAIL_LOGIN, payload: error.response.data.errors });
  }
};

export const current = () => async (dispatch) => {
  dispatch({ type: LOAD });
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    let result = await axios.get(`${ENDPOINT}/api/user/connected`, config);
    dispatch({ type: CURRENT_USER, payload: result.data });
  } catch (error) {
    console.log(error);
    localStorage.removeItem("token");
    window.location.href = `/`;
  }
};
