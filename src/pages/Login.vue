<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center">
        <div>
          <div class="row">
            <div class="col-12 text-h2 text-center text-weight-bolder text-primary q-pb-sm">
              <q-icon name="fas fa-shield-alt" class="q-pr-xs" />
            </div>
            <div
              class="col-12 text-h4 text-center text-weight-bolder text-primary q-pb-xl"
            >Auth JWT Laravel</div>
            <div class="col-12 text-h5">Đăng nhập</div>
          </div>
          <div class="row">
            <div class="col-12">
              <q-form @submit="submitForm" class="q-gutter-md" style="width:500px">
                <q-input
                  v-model="request.email"
                  outlined
                  label="Email *"
                  :rules="[
                    val => $v.request.email.required || 'Vui lòng không để trống trường này.',
                    val => $v.request.email.email || 'Email không hợp lệ.'
                  ]"
                >
                  <template v-slot:append>
                    <q-icon name="far fa-envelope" />
                  </template>
                </q-input>
                <q-input
                  v-model="request.password"
                  outlined
                  label="Mật khẩu *"
                  :type="isPwd ? 'password' : 'text'"
                  :rules="[
                    val =>
                      $v.request.email.required || 'Vui lòng không để trống trường này.'
                  ]"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>

                <div>
                  <q-btn
                    dense
                    glossy
                    no-caps
                    class="q-px-xs"
                    icon="fas fa-sign-in-alt"
                    label="Đăng nhập"
                    type="submit"
                    color="primary"
                  />
                  <q-btn
                    dense
                    flat
                    no-caps
                    @click="redirectRegistration"
                    label="Đăng ký tài khoản mới"
                    type="button"
                    color="primary"
                    class="q-ml-sm q-px-xs"
                  />
                </div>
              </q-form>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import { HTTP_CODES } from "../api/endpoint";

export default {
  name: "PageLogin",
  data() {
    return {
      isPwd: true,
      request: {
        email: "hoangnguyenit98@gmail.com",
        password: "12345678",
      },
    };
  },

  methods: {
    async submitForm() {
      let response = await this.$store.dispatch("auth/acLogin", this.request);
      if (response.code == HTTP_CODES.SUCCESS) {
        this.notifySuccess(response.message);
        return this.redirect({ name: "home" });
      }
      this.notifyFaild(response.message);
    },

    redirectRegistration() {
      return this.redirect({ name: "registration" });
    },
  },

  validations: {
    request: {
      email: {
        required,
        email,
      },

      password: {
        required,
      },
    },
  },
};
</script>
