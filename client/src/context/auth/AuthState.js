import React, { useReducer } from 'react';
import axios from '../../utils/axios-instance';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import {

} from '../actionTypes';

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);



  // Register User
  const registerUser = async data => {

    try {
      const res = await axios.post('/users', data);

      console.log("Succsses!!!")
    } catch (err) {
      console.log("Error" + err)
    }
  };


  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        registerUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
