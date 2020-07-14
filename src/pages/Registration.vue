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
            <div class="col-12 text-h5">Đăng ký tài khoản mới</div>
          </div>
          <div class="row">
            <div class="col-12">
              <q-form @submit="submitForm" class="q-gutter-md" style="width:500px">
                <q-input
                  dense
                  hide-bottom-space
                  type="text"
                  v-model="request.name"
                  outlined
                  label="Họ tên *"
                  :rules="[
                    val=> $v.request.name.required || 'Vui lòng không để trống trường này.',
                    val=> $v.request.name.maxLength || 'Dữ liệu nhập vào quá dài.'
                  ]"
                />
                <q-input
                  dense
                  hide-bottom-space
                  type="text"
                  v-model="request.age"
                  outlined
                  mask="###"
                  label="Tuổi *"
                  :rules="[ 
                    val=> $v.request.age.required || 'Vui lòng không để trống trường này.',
                    val=> $v.request.age.numeric || 'Dữ liệu nhập vào không hợp lệ.',
                  ]"
                />
                <q-input
                  dense
                  hide-bottom-space
                  type="text"
                  v-model="request.email"
                  outlined
                  label="Email *"
                  :rules="[
                    val=> $v.request.email.required || 'Vui lòng không để trống trường này.',
                    val=> $v.request.email.email || 'Email không hợp lệ.',
                    val=> $v.request.email.maxLength || 'Dữ liệu nhập vào quá dài.'
                  ]"
                />
                <q-input
                  dense
                  hide-bottom-space
                  type="password"
                  v-model="request.password"
                  outlined
                  label="Mật khẩu *"
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
                  label="Xác nhận mật khẩu"
                  :rules="[ val=> $v.request.password_confirmation.sameAs || 'Hai mật khẩu chưa khớp nhau.' ]"
                />
                <div>
                  <q-btn no-caps label="Đăng ký" type="submit" color="primary" />
                  <q-btn
                    no-caps
                    label="Quay lại trang đăng nhập"
                    @click="redirectLogin"
                    type="reset"
                    color="primary"
                    flat
                    class="q-ml-sm"
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
import {
  required,
  email,
  maxLength,
  minLength,
  sameAs,
  numeric
} from "vuelidate/lib/validators";
import { HTTP_CODES } from "../api/endpoint";

export default {
  name: "PageRegistration",
  data() {
    return {
      request: {
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
      }
    };
  },

  methods: {
    async submitForm() {
      let response = await this.$store.dispatch(
        "auth/acRegister",
        this.request
      );

      if (response.code == HTTP_CODES.SUCCESS) {
        this.notifySuccess(response.message);
        return this.redirect({ name: "home" });
      }
      this.notifyFaild(response.message);
    },

    redirectLogin() {
      return this.redirect({ name: "login" });
    }
  },

  validations: {
    request: {
      name: {
        required,
        maxLength: maxLength(255)
      },

      age: {
        required,
        numeric: value => {
          if (isNaN(value) || value < 0) {
            return false;
          }
          return true;
        }
      },

      email: {
        required,
        email,
        maxLength: maxLength(255)
      },

      password: {
        required,
        minLength: minLength(8)
      },

      password_confirmation: {
        sameAs: sameAs("password")
      }
    }
  }
};
</script>
