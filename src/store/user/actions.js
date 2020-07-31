import * as USER_API from "../../api/modules/user"
import { HTTP_CODES } from "../../api/endpoint";

export async function acSetDataSearch({ commit }, dataSearch) {
    commit('setDataSearch', dataSearch)
}

export async function acGetList({ commit }, dataSearch) {
    let response = await USER_API.list(dataSearch);
    if (response.code == HTTP_CODES.SUCCESS) {
        commit('setUsers', response.payload.data)
    }
    return response;
}

export async function acAdd({ commit }, request) {
    let response = await USER_API.add(request);
    return response;
}

export async function acView({ commit }, id) {
    let response = await USER_API.view(id);
    return response;
}

export async function acUpdate({ commit }, { id, request }) {
    let response = await USER_API.update(id, request);
    return response;
}

export async function acDestroy({ commit }, id) {
    let response = await USER_API.destroy(id);
    return response;
}

export async function acResetPassword({ commit }, request) {
    let response = await USER_API.resetPassword(request);
    return response;
}

export async function acChangePassword({ commit }, request) {
    let response = await USER_API.changePassword(request);
    return response;
}