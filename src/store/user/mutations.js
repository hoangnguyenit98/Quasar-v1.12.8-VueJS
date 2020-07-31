export function setUsers ( state, payload ) {
    state.users = payload;
}

export function setDataSearch ( state, payload ) {
    state.dataSearch.limit = payload.limit;
    state.dataSearch.name = payload.name;
    state.dataSearch.minAge = payload.minAge;
    state.dataSearch.maxAge = payload.maxAge;
    state.dataSearch.page = payload.page;
    state.dataSearch.del_flg = payload.del_flg;
}
