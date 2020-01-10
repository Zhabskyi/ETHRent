import React, { useReducer } from "react";
// import axios from "../../utils/axios-instance";
import axios from "axios";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import setAuthToken from "../../utils/setAuthToken";
import {
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR
} from "../actionTypes";

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    setAuthToken(localStorage.token);

    try {
      const res = await axios.get("http://localhost:8001/api/auth");


      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Register User
  const registerUser = async data => {
    try {
      const res = await axios.post("http://localhost:8001/api/users", data);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data
      });
    }
  };

  // Login User
  const login = async formData => {
    try {
      const res = await axios.post("http://localhost:8001/api/auth", formData);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });

      loadUser();
    } catch (err) {
      console.log("Error, login fail" + err);
    }
  };

  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        registerUser,
        login,
        logout,
        loadUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
