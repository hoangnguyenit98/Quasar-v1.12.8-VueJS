import { callApi } from "../../api";
import { URL_ENDPOINT, METHOD, HTTP_CODES } from "../../api/endpoint";

export async function acLogin({ commit, state }, request) {
    let response = await callApi(URL_ENDPOINT.LOGIN, METHOD.POST, null, request);

    if (response && response.code == HTTP_CODES.SUCCESS) {
        commit('setProfile', response.payload)
    }

    return response;
}

export async function acGetProfile({ commit, state }) {
    let response = await callApi(URL_ENDPOINT.PROFILE, METHOD.GET);

    if (response && response.code == HTTP_CODES.SUCCESS) {
        commit('setProfile', response.payload)
    }

    return response;
}

export async function acRegister({ commit, state }, request) {
    let response = await callApi(URL_ENDPOINT.REGISTER, METHOD.POST, null, request);
    return response;
}

export async function acLogout({ commit, state }) {
    let response = await callApi(URL_ENDPOINT.LOGOUT, METHOD.POST);
    return response;
}

export async function acRefreshToken({ commit, state }) {
    let response = await callApi(URL_ENDPOINT.REFRESH_TOKEN, METHOD.POST);
    return response;
}
