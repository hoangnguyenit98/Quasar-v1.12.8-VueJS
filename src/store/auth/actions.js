import * as AUTH_API from "../../api/modules/auth";
import { HTTP_CODES } from "../../api/endpoint";

export async function acLogin({ commit }, request) {
  let response = await AUTH_API.login(request);
  if (response.code == HTTP_CODES.SUCCESS) {
    commit("setProfile", response.payload.user);
  }
  return response;
}

export async function acGetProfile({ commit }) {
  let response = await AUTH_API.profile();
  if (response.code == HTTP_CODES.SUCCESS) {
    commit("setProfile", response.payload.user);
  }
  return response;
}

export async function acRegister({}, request) {
  let response = await AUTH_API.register(request);
  return response;
}

export async function acLogout({ commit }) {
  let response = await AUTH_API.logout();
  if (response.code == HTTP_CODES.SUCCESS) {
    commit("setProfile", null);
  }
  return response;
}

export async function acRefreshToken() {
  let response = await AUTH_API.refreshToken();
  return response;
}
