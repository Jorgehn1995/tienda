<template>
  <div>
    <v-dialog v-model="dialog" max-width="400">
      <v-card class="rounded-lg">
        <v-card-title></v-card-title>
        <v-card-text class="py-0">
          <v-row dense>
            <v-col cols="4" class="pt-0">
              <v-avatar
                :color="color + ' lighten-5'"
                size="160"
                style="top: -30px; left: -55px"
              >
                <v-icon size="90" :color="color">
                  {{ icon }}
                </v-icon>
              </v-avatar>
            </v-col>
            <v-col cols="8" class="d-flex justify-center pt-0">
              <div class="mt-2">
                <span :class="color + '--text title'">
                  <slot name="titulo"> Guardar Registro </slot>
                </span>
                <br />
                <span>
                  <slot name="descripcion"
                    >¿Estás seguro de guardar el registro?
                  </slot>
                </span>
              </div>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>
        <v-card-actions>
          <v-btn depressed @click="cancelar()" v-if="btn_cancel">
            <v-icon left>mdi-close</v-icon>
            Cancelar
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn :color="color" dark @click="go()">
            <slot name="btn">
              <v-icon left>mdi-content-save</v-icon>
              Sí, guardar
            </slot>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "green",
    },
    icon: {
      type: String,
      default: "mdi-check",
    },
    btn_cancel: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    cancelar() {
      this.$emit("cancel");
    },
    go() {
      this.$emit("go");
    },
  },
  computed: {
    dialog: {
      get() {
        return this.value;
      },
      set(n) {
        this.$emit("input", n);
      },
    },
  },
};
</script>

<style>
</style>
