import { callApi } from "../../api";
import { URL_ENDPOINT, METHOD } from "../../api/endpoint";

export async function list(dataSearch) {
    let response = await callApi(URL_ENDPOINT.USER, METHOD.GET, dataSearch);
    return response;
}

export async function add(request) {
    let response = await callApi(URL_ENDPOINT.USER, METHOD.POST, null, request);
    return response;
}

export async function view(id) {
    let response = await callApi(`${URL_ENDPOINT.USER}/${id}`, METHOD.GET);
    return response;
}

export async function update(id, request) {
    let response = await callApi(`${URL_ENDPOINT.USER}/${id}`, METHOD.PUT, null, request);
    return response;
}

export async function destroy(id) {
    let response = await callApi(`${URL_ENDPOINT.USER}/${id}`, METHOD.DELETE);
    return response;
}

export async function resetPassword(request) {
    let response = await callApi(`${URL_ENDPOINT.RESET_PASSWORD}`, METHOD.POST, null, request);
    return response;
}

export async function changePassword(request) {
    console.log(11111111111111)
    let response = await callApi(`${URL_ENDPOINT.CHANGE_PASSWORD}`, METHOD.POST, null, request);
    return response;
}