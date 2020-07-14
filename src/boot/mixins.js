export default async ({ Vue }) => {
  Vue.mixin({
    methods: {
      redirect(urlObj) {
        return this.$router.push(urlObj);
      },

      notifySuccess(message) {
        this.$q.notify({
          type: 'positive',
          message,
          position: 'top-right'
        })
      },

      notifyFaild(message) {
        this.$q.notify({
          type: 'negative',
          message,
          position: 'top-right'
        })
      }
    },
  });
}
