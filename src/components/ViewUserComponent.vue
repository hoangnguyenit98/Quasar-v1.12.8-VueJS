<template>
  <q-dialog persistent ref="dialog_view_user">
    <q-card class="my-card">
      <q-card-section>
        <q-toolbar class="bg-primary text-white" style="min-width: 300px">
          <q-toolbar-title>Thông tin chi tiết tài khoản</q-toolbar-title>
          <q-btn @click="onCancelClick" flat round dense icon="fas fa-times" />
        </q-toolbar>
        <div class="row">
          <div class="col-12 q-gutter-md q-pa-sm">
            <div class="text-h5">{{prop_user ? prop_user.name: ''}}</div>
            <div>{{prop_user ? `${prop_user.age} tuổi`: ''}}</div>
            <div>Email: {{prop_user ? prop_user.email: ''}}</div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "ViewUserComponent",

  props: ['prop_user'],

  methods: {
    show() {
      this.$refs.dialog_view_user.show();
    },

    hide() {
      this.$refs.dialog_view_user.hide();
    },

    onOKClick() {
      this.$emit("ok");
      this.hide();
    },

    onCancelClick() {
      this.hide();
    },
  },
};
</script>