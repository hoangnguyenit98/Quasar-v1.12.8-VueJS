<template>
  <q-dialog ref="dialog_profile" persistent>
    <q-card class="my-card">
      <q-card-section>
        <q-toolbar class="bg-primary text-white" style="min-width: 300px">
          <q-toolbar-title>Thông tin cá nhân</q-toolbar-title>
          <q-btn @click="onCancelClick" flat round dense icon="fas fa-times" />
        </q-toolbar>
        <div class="row">
          <div class="col-12 q-gutter-md q-pa-sm">
            <div class="text-h5">{{profile ? profile.name: ''}}</div>
            <div>{{profile ? `${profile.age} tuổi`: ''}}</div>
            <div>Email: {{profile ? profile.email: ''}}</div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { HTTP_CODES } from "../api/endpoint";
import store from "../store";
export default {
  name: "ProfileComponent",

  methods: {
    show() {
      this.$refs.dialog_profile.show();
    },

    hide() {
      this.$refs.dialog_profile.hide();
    },

    onOKClick() {
      this.$emit("ok");
      this.hide();
    },

    onCancelClick() {
      this.hide();
    }
  },

  computed: {
    profile: function() {
      return this.$store.getters["auth/getUser"];
    }
  }
};
</script>