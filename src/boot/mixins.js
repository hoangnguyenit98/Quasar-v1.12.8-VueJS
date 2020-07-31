import DiaLogComponent from '../components/DiaLogComponent';
import { DELETED } from '../constant';

export default async ({ Vue }) => {
  Vue.mixin({
    components: {
      DiaLogComponent
    },
    methods: {
      redirect(urlObj) {
        return this.$router.push(urlObj);
      },

      notifySuccess(message) {
        this.$q.notify({
          type: 'positive',
          message,
          position: 'bottom'
        })
      },

      notifyFaild(message) {
        this.$q.notify({
          type: 'negative',
          message,
          position: 'bottom'
        })
      },

      dialog(title, message, buttonOkLabel = "Đồng ý", buttonCancelLabel = "Hủy") {
        return this.$q.dialog({ component: DiaLogComponent, title, message, buttonOkLabel, buttonCancelLabel });
      },

      isDeleted(status) {
        return status == DELETED
      }
    },
  });
}
