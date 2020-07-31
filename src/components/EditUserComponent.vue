<template>
  <q-dialog persistent ref="dialog_edit_user">
    <q-card class="my-card">
      <q-card-section>
        <div class="row">
          <div class="col-12 text-h2 text-center text-weight-bolder text-primary q-pb-sm">
            <q-icon name="fas fa-shield-alt" class="q-pr-xs" />
          </div>
          <div
            class="col-12 text-h4 text-center text-weight-bolder text-primary q-pb-xl"
          >Auth JWT Laravel</div>
          <div class="col-12 text-h5">Chỉnh sửa thông tin tài khoản</div>
        </div>
        <div class="row">
          <div class="col-12">
            <q-form @submit="submitForm" class="q-gutter-sm" ref="frmAddUser">
              <q-card>
                <q-card-section class="q-gutter-sm q-pt-none">
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
                    disable
                  />
                </q-card-section>
              </q-card>
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
  name: "EditUserComponent",

  props: ["prop_user"],

  data() {
    return {
      validationsServer: [],
      request: {
        name: "",
        age: "",
        email: "",
      },
    };
  },

  created() {
    this.request.name = this.prop_user.name;
    this.request.age = this.prop_user.age;
    this.request.email = this.prop_user.email;
  },

  methods: {
    show() {
      this.$refs.dialog_edit_user.show();
    },

    hide() {
      this.$refs.dialog_edit_user.hide();
    },

    async submitForm() {
      let response = await this.$store.dispatch("user/acUpdate", {
        id: this.prop_user.id,
        request: this.request,
      });

      if (response.code == HTTP_CODES.SUCCESS) {
         this.$store.dispatch("user/acGetList", this.dataSearch);
        this.notifySuccess(response.message);
        return this.hide();
      }

      if (response.code == HTTP_CODES.ERROR_VALIDATION) {
        this.validationsServer = response.payload.errors;
      }

      this.notifyFaild(response.message);
    },
  },

  computed: {
    dataSearch: function () {
      return this.$store.getters["user/getDataSearch"];
    },
  },

  validations: {
    request: {
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
    },
  },
};
</script>