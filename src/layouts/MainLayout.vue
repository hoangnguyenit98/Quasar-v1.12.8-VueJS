<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <q-icon name="fas fa-shield-alt" class="q-pr-xs" />Auth JWT Laravel
        </q-toolbar-title>

        <q-btn class="q-pa-xs" flat size="sm" round dense icon="fas fa-bars">
          <q-menu transition-show="scale" transition-hide="scale">
            <q-list style="min-width: 200px">
              <q-item clickable v-close-popup @click="showProfile">
                <q-item-section avatar>
                  <q-icon size="xs" color="grey-7" name="fas fa-id-badge" />
                </q-item-section>
                <q-item-section>Thông tin cá nhân</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="refreshToken">
                <q-item-section avatar>
                  <q-icon size="xs" color="grey-7" name="fas fa-sync-alt" />
                </q-item-section>
                <q-item-section>Làm mới token</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="changePassword">
                <q-item-section avatar>
                  <q-icon size="xs" color="grey-7" name="fas fa-unlock-alt" />
                </q-item-section>
                <q-item-section>Đổi mật khẩu</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup @click="logout">
                <q-item-section avatar>
                  <q-icon size="xs" color="grey-7" name="fas fa-sign-out-alt" />
                </q-item-section>
                <q-item-section>Đăng xuất</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { HTTP_CODES } from "../api/endpoint";
import ChangePasswordComponent from "../components/ChangePasswordComponent";
import ProfileComponent from "../components/ProfileComponent";

export default {
  name: "MainLayout",

  methods: {
    async logout() {
      let response = await this.$store.dispatch("auth/acLogout");
      if (response.code == HTTP_CODES.SUCCESS) {
        return this.redirect({ name: "login" });
      }
    },

    async refreshToken() {
      let response = await this.$store.dispatch("auth/acRefreshToken");
      if (response.code == HTTP_CODES.SUCCESS) {
        return this.notifySuccess(response.message);
      }
      this.notifyFaild(response.message);
    },

    changePassword() {
      this.$q.dialog({ component: ChangePasswordComponent, parent: this });
    },

    showProfile() {
      this.$q.dialog({ component: ProfileComponent, parent: this });
    }
  }
};
</script>
