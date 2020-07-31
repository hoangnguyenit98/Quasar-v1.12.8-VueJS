import { callApi } from "../../api";
import { URL_ENDPOINT, METHOD } from "../../api/endpoint";

export async function login(request) {
    let response = await callApi(URL_ENDPOINT.LOGIN, METHOD.POST, null, request);
    return response;
}

export async function profile() {
    let response = await callApi(URL_ENDPOINT.PROFILE, METHOD.GET);
    return response;
}

export async function register(request) {
    let response = await callApi(URL_ENDPOINT.REGISTER, METHOD.POST, null, request);
    return response;
}

export async function logout() {
    let response = await callApi(URL_ENDPOINT.LOGOUT, METHOD.POST);
    return response;
}

export async function refreshToken() {
    let response = await callApi(URL_ENDPOINT.REFRESH_TOKEN, METHOD.POST);
    return response;
}
