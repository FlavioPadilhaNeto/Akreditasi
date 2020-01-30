/* eslint-disable promise/param-names */
import axios from 'axios';

import {
  AUTH_REQUEST,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  APP_ID
} from "../actions/auth";
import { USER_REQUEST } from "../actions/user";
import apiCall from "utils/api";

const state = {
  token: localStorage.getItem("user-token") || "",
  status: "",
  hasLoadedOnce: false
};

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status
};

const actions = {
    [AUTH_REQUEST]: ({ commit, dispatch }, user) => {
      
     return new Promise((resolve, reject) => {
           
      commit(AUTH_REQUEST);

         apiCall.tokenCall({ url: "https://api-dxc.sensedia.com/oauth/access-token", data: user, method: "POST", token: true })
             .then(resp => {
              localStorage.setItem("user-token", resp.data.access_token);
        
              axios.defaults.headers['access_token'] = resp.data.access_token;
              axios.defaults.headers['client_id'] = APP_ID;

              commit(AUTH_SUCCESS, resp);
              dispatch(USER_REQUEST);
              resolve(resp);
        })
             .catch(err => {
                  commit(AUTH_ERROR, err);
                  localStorage.removeItem("user-token");
                  reject(err);
        });
    });
  },
  [AUTH_LOGOUT]: ({ commit }) => {
    return new Promise(resolve => {
      commit(AUTH_LOGOUT);
      localStorage.removeItem("user-token");
      resolve();
    });
  }
};

const mutations = {
  [AUTH_REQUEST]: state => {
    state.status = "loading";
  },
  [AUTH_SUCCESS]: (state, resp) => {
    state.status = "success";
    state.token = resp.token;
    state.hasLoadedOnce = true;
  },
  [AUTH_ERROR]: state => {
    state.status = "error";
    state.hasLoadedOnce = true;
  },
  [AUTH_LOGOUT]: state => {
    state.token = "";
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
