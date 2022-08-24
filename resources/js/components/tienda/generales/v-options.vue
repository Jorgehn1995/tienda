<template>
  <div>
    <div class="d-flex justify-center align-center" style="height:100%;">
      <v-btn @click="openMenu" icon>
        <v-icon>{{ icon }}</v-icon>
      </v-btn>
    </div>
    <div v-if="$vuetify.breakpoint.xsOnly">
      <v-bottom-sheet
        v-model="show"
        width="100%"
        class="rounded-lg"
        close-delay="3000"

      >
        <v-list dense class="rounded-t-lg">
          <div
            v-touch="{
              down: () => cerrar(),
            }"
          >
            <v-sheet class="d-flex justify-center py-1 align-center">
              <div class="hide-on-touch grey lighten-2"></div>
            </v-sheet>
            <div>
              <slot name="title">
                <v-list-item v-if="title || subtitle">
                  <v-list-item-content>
                    <v-list-item-title>{{ title }}</v-list-item-title>
                    <v-list-item-subtitle>{{ subtitle }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </slot>
            </div>
          </div>

          <v-card

            :color="$vuetify.theme.isDark?'grey darken-4':'grey lighten-3'"
            elevation="0"
            class="mx-2 rounded-lg mb-1"
          >
            <v-card-text class="px-1">
              <v-list
                dense
                color="transparent"
                :class="{ 'py-0': $vuetify.breakpoint.smAndDown }"
              >
                <slot name="options"></slot>
              </v-list>
            </v-card-text>
          </v-card>
        </v-list>
      </v-bottom-sheet>
    </div>
    <div v-else>
      <v-menu v-model="show" :position-x="x" :position-y="y" absolute offset-y max-width="200" min-width="200" >
        <v-list dense>
          <slot name="title">
            <v-list-item v-if="title || subtitle">
              <v-list-item-content>
                <v-list-item-title>{{ title }}</v-list-item-title>
                <v-list-item-subtitle>{{ subtitle }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </slot>
          <v-divider v-if="title || subtitle || divider"></v-divider>
          <v-list
            dense
            color="transparent"
            class="pt-0"
            :class="{ 'py-0': $vuetify.breakpoint.smAndDown }"
          >
            <v-list dense>
              <slot name="options"></slot>
            </v-list>
          </v-list>
        </v-list>
      </v-menu>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    subtitle: {
      type: String,
      default: "",
    },
    value: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: "mdi-dots-vertical",
    },
    divider: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    isLoading: false,
    x: 0,
    y: 0,
    show: false,
  }),
  methods: {
    openMenu(e) {
      e.preventDefault();
      this.show = false;
      this.x = e.clientX;
      this.y = e.clientY;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    cerrar() {
      this.show = false;
      console.log("Movimiento");
    },
  },
};
</script>

<style>
</style>
