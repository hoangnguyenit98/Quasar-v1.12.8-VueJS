<template>
  <q-dialog ref="dialog_change_password" persistent>
    <q-card class="my-card">
      <q-card-section>
        <q-toolbar class="bg-primary text-white" style="min-width: 400px">
          <q-toolbar-title>Đổi mật khẩu</q-toolbar-title>
          <q-btn @click="onCancelClick" flat round dense icon="fas fa-times" />
        </q-toolbar>
        <div class="row q-mt-sm">
          <div class="col-12">
            <q-form @submit="submitForm" class="q-gutter-md">
              <q-input
                dense
                hide-bottom-space
                type="password"
                v-model="request.password_current"
                outlined
                label="Mật khẩu hiện tại *"
                :rules="[
                    val=> $v.request.password_current.required || 'Vui lòng không để trống trường này.',
                    val=> $v.request.password_current.minLength || 'Vui lòng nhập tối thiểu 8 ký tự.',
                  ]"
              />
              <q-input
                dense
                hide-bottom-space
                type="password"
                v-model="request.password"
                outlined
                label="Mật khẩu mới *"
                :rules="[ 
                    val=> $v.request.password.required || 'Vui lòng không để trống trường này.',
                    val=> $v.request.password.minLength || 'Vui lòng nhập tối thiểu 8 ký tự.',
                  ]"
              />
              <q-input
                dense
                hide-bottom-space
                type="password"
                v-model="request.password_confirmation"
                outlined
                label="Xác nhận mật khẩu mới *"
                :rules="[ val=> $v.request.password_confirmation.sameAs || 'Hai mật khẩu chưa khớp nhau.' ]"
              />
              <div>
                <q-btn
                  class="q-px-xs"
                  type="submit"
                  dense
                  glossy
                  no-caps
                  color="primary"
                  icon="far fa-save"
                  label="Lưu"
                />
                <q-btn
                  class="q-ml-sm q-px-xs"
                  dense
                  glossy
                  no-caps
                  color="grey-8"
                  icon="far fa-stop-circle"
                  label="Đóng"
                  @click="onCancelClick"
                />
              </div>
            </q-form>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import {
  required,
  email,
  maxLength,
  minLength,
  sameAs,
  numeric,
} from "vuelidate/lib/validators";
import { HTTP_CODES } from "../api/endpoint";
export default {
  name: "ChangePasswordComponent",

  data() {
    return {
      request: {
        id: "",
        password_current: "",
        password: "",
        password_confirmation: "",
      },
    };
  },

  methods: {
    show() {
      this.$refs.dialog_change_password.show();
    },

    hide() {
      this.$refs.dialog_change_password.hide();
    },

    async submitForm() {
      this.request.id = this.profile.id ? this.profile.id : null;
      let response = await this.$store.dispatch(
        "user/acChangePassword",
        this.request
      );

      if (response.code == HTTP_CODES.SUCCESS) {
        this.notifySuccess(response.message);
        return this.hide();
      }
      this.notifyFaild(response.message);
    },

    onOKClick() {
      this.$emit("ok");
      this.hide();
    },

    onCancelClick() {
      this.hide();
    },
  },

  computed: {
    profile: function () {
      return this.$store.getters["auth/getUser"];
    },
  },

  validations: {
    request: {
      password_current: {
        required,
        minLength: minLength(8),
      },

      password: {
        required,
        minLength: minLength(8),
      },

      password_confirmation: {
        sameAs: sameAs("password"),
      },
    },
  },
};
</script>