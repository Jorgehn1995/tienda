<template>
  <v-dialog v-model="isOpen" width="400" persistent>
    <v-card class="rounded-xl dialog-lerniz">
      <v-card-title></v-card-title>
      <v-card-text class="py-0">
        <v-row dense>
          <v-col cols="4" class="pt-0">
            <v-avatar
              :color="color + ' lighten-5'"
              size="160"
              :style="posicion.circulo"
            >
              <v-icon :size="posicion.icon" :color="color">{{ icon }}</v-icon>
            </v-avatar>
          </v-col>
          <v-col cols="8" class="d-flex justify-left pt-0">
            <div class="mt-2">
              <span :class="color + '--text title'">
                {{ title }}
              </span>
              <br />
              <span> {{ subtitle }} </span>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn
          v-if="btnCancel"
          large
          @click="(isOpen = false), $emit('cancel')"
        >
          <v-icon left>mdi-close</v-icon>
          Cancelar
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          large
          :color="color"
          text
          dark
          @click="(isOpen = false), $emit('ok')"
        >
          Entendido
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import confetti from "canvas-confetti";
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "Titulo",
    },
    subtitle: {
      type: String,
      default: "Subtitulo",
    },
    icon: {
      type: String,
      default: "mdi-check",
    },
    "btn-cancel": {
      type: Boolean,
      default: false,
    },
    "btn-ok": {
      type: Boolean,
      default: true,
    },
    confetti: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "green",
    },
  },
  data: () => ({
    isLoading: false,
  }),
  methods: {
    setConfetti: confetti,
    cancel() {},
  },
  computed: {
    posicion() {
      if (this.$vuetify.breakpoint.xsOnly) {
        return {
          circulo: "top: -0px; left: -68px",
          icon: 100,
        };
      } else {
        return {
          circulo: "top: -30px; left: -55px",
          icon: 90,
        };
      }
    },
    isOpen: {
      get() {
        return this.value;
      },
      set(n) {
        return this.$emit("input", n);
      },
    },
  },
  watch: {
    isOpen() {
      if (this.value && this.confetti) {
        setTimeout(() => {
          this.setConfetti({
            particleCount: 100,
            colors: ["#4CAF50", "#0E7112", "#75DF79", "#00bcd4"],
            spread: 70,
            origin: { y: 0.6 },
            zIndex: 1000,
          });
        }, 200);
      }
    },
  },
};
</script>

<style>
.dialog-lerniz {
  overflow: hidden;
}
</style>
