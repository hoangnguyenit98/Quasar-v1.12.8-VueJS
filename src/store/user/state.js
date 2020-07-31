import { USER_DATA_SEARCH_DEFAULT } from '../../constant'

export default function () {
  return {
    users: [],
    dataSearch: { ...USER_DATA_SEARCH_DEFAULT }
  }
}
