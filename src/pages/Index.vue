<template>
  <q-page class="q-pa-md">
    <q-toolbar class="bg-grey-7 text-white">
      <q-toolbar-title>
        <q-icon name="fas fa-users-cog" class="q-pa-xs" />Users Manage
      </q-toolbar-title>
      <q-btn class="q-pa-xs" @click="showDialogAddUser" flat size="sm" round dense icon="fas fa-user-plus" />
    </q-toolbar>
    <div class="q-pt-md">
      <q-table title="Users list" :data="data" :columns="columns" row-key="name"></q-table>
    </div>
    <AddUserComponent></AddUserComponent>
  </q-page>
</template>

<script>
import AddUserComponent from "../components/AddUserComponent";
export default {
  name: "PageIndex",
  components: { AddUserComponent },
  data() {
    return {
      columns: [
        {
          name: "calories",
          align: "left",
          label: "ID",
          field: "calories",
          sortable: true
        },
        {
          name: "fat",
          align: "left",
          label: "Name",
          field: "fat",
          sortable: true
        },
        { name: "carbs", align: "left", label: "Created At", field: "carbs" },
        {
          name: "protein",
          align: "left",
          label: "Last Update",
          field: "protein"
        },
        { name: "sodium", align: "center", label: "Action", field: "sodium" }
      ],
      data: [
        {
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: "14%",
          iron: "1%"
        },
        {
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: "8%",
          iron: "1%"
        },
        {
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: "6%",
          iron: "7%"
        },
        {
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: "3%",
          iron: "8%"
        },
        {
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          sodium: 327,
          calcium: "7%",
          iron: "16%"
        },
        {
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          sodium: 50,
          calcium: "0%",
          iron: "0%"
        },
        {
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          sodium: 38,
          calcium: "0%",
          iron: "2%"
        },
        {
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          sodium: 562,
          calcium: "0%",
          iron: "45%"
        },
        {
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          sodium: 326,
          calcium: "2%",
          iron: "22%"
        },
        {
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          sodium: 54,
          calcium: "12%",
          iron: "6%"
        }
      ]
    };
  },
  methods: {
    showDialogAddUser() {
       this.$refs.dialogAddUser.show()
    }
  },
};
</script>
