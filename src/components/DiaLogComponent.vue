<template>
  <q-dialog persistent ref="dialog_confirm">
    <q-card class="my-card">
      <q-card-section>
        <q-toolbar class="bg-primary text-white" style="min-width: 400px">
          <q-toolbar-title>{{title}}</q-toolbar-title>
          <q-btn @click="hide" flat round dense icon="fas fa-times" />
        </q-toolbar>
        <div class="row q-mt-sm q-py-xl q-px-md">
          <div class="col-12">{{message}}</div>
        </div>
        <div class="row justify-end">
            <div>
              <q-btn
                class="q-px-xs"
                dense
                no-caps
                flat
                color="primary"
                :label="buttonOkLabel"
                @click="onOKClick"
              />
              <q-btn
                class="q-ml-sm q-px-xs"
                dense
                no-caps
                flat
                color="red-8"
                :label="buttonCancelLabel"
                @click="hide"
              />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "DiaLogComponent",
  props: {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    buttonOkLabel: String,
    buttonCancelLabel: String,
  },

  methods: {
    show() {
      this.$refs.dialog_confirm.show();
    },

    hide() {
      this.$refs.dialog_confirm.hide();
    },

    onOKClick() {
      this.$emit("ok");
      this.hide();
    },
  },
};
</script>