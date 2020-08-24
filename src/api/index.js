import { Loading, QSpinnerGears } from "quasar";
import { BASE_URL } from "./endpoint";
import axios from "axios";

export async function callApi(
  url,
  method,
  params = null,
  data = null,
  headers = {}
) {
  Loading.show({
    spinner: QSpinnerGears
  });
  let response;
  try {
    response = await axios({
      url,
      method: method,
      baseURL: BASE_URL,
      headers,
      params,
      data,
      withCredentials: true,
      timeout: 3000
    });
  } catch (error) {}

  Loading.hide();

  if (response && response.status == 200) {
    return response.data;
  }

  return { code: 500 };
}
