<template>
  <q-page class="q-pa-md">
    <q-toolbar class="bg-grey-7 text-white">
      <q-toolbar-title>
        <q-icon name="fas fa-users-cog" class="q-pa-xs" />Users Manage
      </q-toolbar-title>
      <q-btn
        class="q-pa-xs"
        @click="handleButtonAddClick"
        flat
        size="sm"
        round
        dense
        icon="fas fa-user-plus"
      />
    </q-toolbar>

    <q-card class="q-mt-xs">
      <q-card-section>
        <div class="text-subtitle1">Tìm kiếm</div>
        <div class="row q-gutter-xl">
          <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2">
            <q-input dense type="text" v-model="dataSearch.name" outlined label="Họ tên" />
          </div>
          <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
            <q-badge color="primary">Độ tuổi từ: {{ age.min }} đến {{ age.max }}</q-badge>
            <q-range v-model="age" :min="1" :max="200" color="primary" />
          </div>
        </div>
        <div class="row q-gutter-md">
          <div class="col-xs-1">
            <q-input
              dense
              type="text"
              mask="#####"
              v-model="dataSearch.limit"
              outlined
              label="Số lượng bản ghi hiển thị"
            />
          </div>
          <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            <q-toggle v-model="deleted" color="red" label="Đã xóa" />
          </div>
        </div>
        <div class="q-mt-md">
          <q-btn
            dense
            glossy
            no-caps
            icon="fas fa-search"
            label="Tìm kiếm"
            class="q-px-sm"
            color="primary"
            @click="handleButtonSearchClick"
          />
          <q-btn
            dense
            glossy
            no-caps
            icon="fas fa-file-csv"
            label="Tải file csv"
            class="q-px-sm q-ml-sm"
            color="green-8"
            @click="handleButtonSearchClick"
          />
        </div>
      </q-card-section>
    </q-card>

    <div class="q-pt-md">
      <q-markup-table>
        <thead>
          <tr>
            <th class="text-left">ID</th>
            <th class="text-left">Email</th>
            <th class="text-right">Tên</th>
            <th class="text-right">Tuổi</th>
            <th class="text-right">Ngày đăng ký</th>
            <th class="text-right">Chỉnh sửa gần đây</th>
            <th class="text-center">Tiện ích</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in lstData" :key="item.id">
            <td class="text-left">{{ item.id }}</td>
            <td class="text-left">{{ item.email }}</td>
            <td class="text-right">{{ item.name }}</td>
            <td class="text-right">{{ item.age }}</td>
            <td class="text-right">{{ item.created_at ? formatDate(item.created_at) : '-' }}</td>
            <td class="text-right">{{ item.updated_at ? formatDate(item.updated_at) : '-' }}</td>
            <td class="text-center">
              <q-btn
                @click="handleButtonViewClick(item)"
                icon="far fa-eye"
                class="q-pa-xs"
                outline
                size="sm"
                dense
                color="positive"
              />
              <q-btn
                @click="handleButtonEditClick(item)"
                icon="far fa-edit"
                class="q-pa-xs q-ml-xs"
                outline
                size="sm"
                dense
                color="primary"
              />
              <q-btn
                @click="handleButtonResetPasswordClick(item)"
                icon="fas fa-unlock-alt"
                class="q-pa-xs q-ml-xs"
                outline
                size="sm"
                dense
                color="orange"
              />
              <q-btn
                v-if="!isDeleted(item.del_flg)"
                @click="handleButtonDeleteClick(item)"
                icon="far fa-trash-alt"
                class="q-pa-xs q-ml-xs"
                outline
                size="sm"
                dense
                color="red"
              />
            </td>
          </tr>
        </tbody>
      </q-markup-table>
      <div v-if="pagination.maxPage > 1" class="q-pt-sm">
        <q-pagination
          v-model="pagination.current"
          color="primary"
          :max="pagination.maxPage"
          :max-pages="8"
          :boundary-numbers="true"
          @click="handlePaginationClick"
        ></q-pagination>
      </div>
    </div>
  </q-page>
</template>

<script>
import { HTTP_CODES } from "../api/endpoint";
import { NOT_DELETED_YET, DELETED } from "../constant";
import { USER_DATA_SEARCH_DEFAULT } from "../constant";
import AddUserComponent from "../components/AddUserComponent";
import EditUserComponent from "../components/EditUserComponent";
import ViewUserComponent from "../components/ViewUserComponent";
export default {
  name: "HomePage",
  data() {
    return {
      age: {
        min: 1,
        max: 30,
      },
      deleted: false,
      dataSearch: { ...USER_DATA_SEARCH_DEFAULT },
      pagination: {
        current: 0,
        maxPage: 0,
      },
    };
  },

  created() {
    this.getData();
  },

  methods: {
    async getData() {
      let response = await this.$store.dispatch(
        "user/acGetList",
        this.dataSearch
      );
      if (response.code == HTTP_CODES.SUCCESS) {
        let { payload } = response;
        this.pagination.current = payload.current_page;
        this.pagination.maxPage = payload.last_page;
      }
    },

    handleButtonSearchClick() {
      this.dataSearch.minAge = this.age.min;
      this.dataSearch.maxAge = this.age.max;
      this.dataSearch.del_flg = this.deleted ? DELETED : NOT_DELETED_YET;
      this.dataSearch.page = 1;
      this.$store.dispatch("user/acSetDataSearch", this.dataSearch);
      this.getData();
    },

    handleButtonAddClick() {
      this.$q.dialog({ component: AddUserComponent, parent: this });
    },

    async handleButtonViewClick(user) {
      let response = await this.$store.dispatch("user/acView", user.id);
      if (response.code == HTTP_CODES.SUCCESS) {
        this.$q.dialog({
          component: ViewUserComponent,
          parent: this,
          prop_user: response.payload,
        });
        return this.notifySuccess(response.message);
      }
      this.notifyFaild(response.message);
    },

    async handleButtonEditClick(user) {
      let response = await this.$store.dispatch("user/acView", user.id);
      if (response.code == HTTP_CODES.SUCCESS) {
        this.$q.dialog({
          component: EditUserComponent,
          parent: this,
          prop_user: response.payload,
        });
        return this.notifySuccess(response.message);
      }
      this.notifyFaild(response.message);
    },

    handleButtonDeleteClick(user) {
      let self = this;
      let title = "Xác nhận xóa tài khoản.";
      let message = `Bạn thực sự muốn xóa tài khoản ${user.email}?`;
      let dialog = self.dialog(title, message);
      dialog.onOk(async () => {
        let response = await self.$store.dispatch("user/acDestroy", user.id);
        if (response.code == HTTP_CODES.SUCCESS) {
          this.getData();
          return self.notifySuccess(response.message);
        }
        self.notifyFaild(response.message);
      });
    },

    handleButtonResetPasswordClick(user) {
      let self = this;
      let title = "Xác nhận đặt lại mật khẩu.";
      let message = `Bạn thực sự muốn đặt lại mật khẩu tài khoản ${user.email}?`;
      let dialog = self.dialog(title, message);
      let { id } = user;
      dialog.onOk(async () => {
        let response = await self.$store.dispatch("user/acResetPassword", {
          id,
        });
        if (response.code == HTTP_CODES.SUCCESS) {
          return self.notifySuccess(response.message);
        }
        self.notifyFaild(response.message);
      });
    },

    handlePaginationClick() {
      this.dataSearch.page = this.pagination.current;
      this.$store.dispatch("user/acSetDataSearch", this.dataSearch);
      this.getData();
    },
  },

  computed: {
    lstData: function () {
      return this.$store.getters["user/getUsers"];
    },
  },
};
</script>
