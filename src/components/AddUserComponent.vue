<template>
  <q-dialog persistent ref="dialog_add_user">
    <q-card class="my-card">
      <q-card-section>
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
            <q-form @submit="submitForm" class="q-gutter-sm" ref="frmAddUser">
              <q-card v-for="(item, index) in request" :key="index">
                <q-card-section>
                  <q-toolbar class="text-primary">
                    <q-toolbar-title>Tài khoản</q-toolbar-title>
                    <q-btn @click="addUser(index)" flat round size="xs" icon="fas fa-plus" />
                    <q-btn
                      v-if="request.length>1"
                      @click="removeUser(index)"
                      flat
                      round
                      size="xs"
                      color="red-10"
                      icon="far fa-trash-alt"
                    />
                  </q-toolbar>
                </q-card-section>

                <q-separator dark inset />

                <q-card-section class="q-gutter-sm q-pt-none">
                  <q-input
                    dense
                    hide-bottom-space
                    type="text"
                    v-model="item.name"
                    outlined
                    label="Họ tên *"
                    :rules="[
                    val=> $v.request.$each[index].name.required || 'Vui lòng không để trống trường này.',
                    val=> $v.request.$each[index].name.maxLength || 'Dữ liệu nhập vào quá dài.'
                  ]"
                  />
                  <q-input
                    dense
                    hide-bottom-space
                    type="text"
                    v-model="item.age"
                    outlined
                    mask="###"
                    label="Tuổi *"
                    :rules="[ 
                      val=> $v.request.$each[index].age.required || 'Vui lòng không để trống trường này.',
                      val=> $v.request.$each[index].age.numeric || 'Dữ liệu nhập vào không hợp lệ.',
                    ]"
                  />
                  <q-input
                    dense
                    hide-bottom-space
                    type="text"
                    v-model="item.email"
                    outlined
                    label="Email *"
                    :rules="[
                      val=> $v.request.$each[index].email.required || 'Vui lòng không để trống trường này.',
                      val=> $v.request.$each[index].email.email || 'Email không hợp lệ.',
                      val=> $v.request.$each[index].email.maxLength || 'Dữ liệu nhập vào quá dài.'
                    ]"
                    :error-message="isError(index) ? 'Email này đã tồn tại' : null"
                    :error="isError(index)"
                    @input="handleEmailInput(index)"
                  />
                </q-card-section>
              </q-card>
              <p>Mật khẩu mặc định: 12345678</p>
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
                  @click="hide"
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
  numeric,
} from "vuelidate/lib/validators";
import { HTTP_CODES } from "../api/endpoint";
export default {
  name: "AddUserComponent",

  data() {
    return {
      validationsServer: [],
      request: [
        {
          name: "",
          email: "",
          password: "",
          password_confirmation: "",
        },
      ],
    };
  },

  methods: {
    show() {
      this.$refs.dialog_add_user.show();
    },

    hide() {
      this.$refs.dialog_add_user.hide();
    },

    addUser(index) {
      this.request.splice(index + 1, 0, { ...this.request[index] });
    },

    removeUser(index) {
      if (this.request.length <= 1) {
        return;
      }
      this.$refs.frmAddUser.resetValidation();
      this.request.splice(index, 1);
    },

    async submitForm() {
      let response = await this.$store.dispatch("user/acAdd", this.request);

      if (response.code == HTTP_CODES.CREATED) {
        this.$store.dispatch("user/acGetList", this.dataSearch);
        this.notifySuccess(response.message);
        return this.hide();
      }

      if (response.code == HTTP_CODES.ERROR_VALIDATION) {
        this.validationsServer = response.payload.errors;
      }

      this.notifyFaild(response.message);
    },

    isError(index) {
      if (!this.validationsServer[`${index}.email`]) {
        return false;
      }

      if (this.validationsServer[`${index}.email`] == "Email này đã tồn tại") {
        return true;
      }

      return false;
    },

    handleEmailInput(index) {
      if (this.validationsServer[`${index}.email`]) {
        delete this.validationsServer[`${index}.email`];
      }
    },
  },

  computed: {
    dataSearch: function () {
      return this.$store.getters["user/getDataSearch"];
    },
  },

  validations: {
    request: {
      $each: {
        name: {
          required,
          maxLength: maxLength(255),
        },

        age: {
          required,
          numeric: (value) => {
            if (isNaN(value) || value < 0) {
              return false;
            }
            return true;
          },
        },

        email: {
          required,
          email,
          maxLength: maxLength(255),
        },
      },
    },
  },
};
</script>