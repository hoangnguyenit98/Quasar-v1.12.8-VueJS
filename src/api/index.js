import { Loading, QSpinnerGears } from 'quasar'
import { BASE_URL } from "./endpoint"
import axios from "axios"

export async function callApi(url, method, params = null, data = null, headers = {}) {
    console.log(`${BASE_URL}${url}`);
    Loading.show({
        spinner: QSpinnerGears,
    });
    let response = await axios({
        url,
        method: method,
        baseURL: BASE_URL,
        headers,
        params,
        data,
        withCredentials: true
    });
    Loading.hide();

    console.log(response);

    if (response.status == 200) {
        return response.data;
    }

    return { code: 500 }
}