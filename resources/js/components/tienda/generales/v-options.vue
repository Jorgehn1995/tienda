<template>
  <div class="v-btn">
    <div
      :class="flex_center ? 'd-flex justify-center align-center' : ''"
      style="height: 100%"
      ref="activator"
    >
      <slot
        name="activator"
        v-bind:open="openMenu"
        v-bind:isOpen="show"
        v-bind:close="cerrar"
      >
        <v-btn @click="openMenu" icon>
          <v-icon>{{ icon }}</v-icon>
        </v-btn>
      </slot>
    </div>

    <div v-if="$vuetify.breakpoint.xsOnly">
      <v-bottom-sheet
        v-model="show"
        width="100%"
        class="rounded-lg"
        :close-delay="2000"
      >
        <v-sheet class="rounded-t-lg" @click="cerrar()">
          <v-list dense class="rounded-t-lg">
            <div
              v-touch="{
                down: () => cerrar(),
              }"
              @click="cerrar()"
            >
              <v-sheet class="d-flex justify-center py-1 align-center">
                <div class="hide-on-touch grey lighten-2"></div>
              </v-sheet>
              <div>
                <slot name="title">
                  <v-list-item v-if="title || subtitle">
                    <v-list-item-content>
                      <v-list-item-title>{{ title }}</v-list-item-title>
                      <v-list-item-subtitle>{{
                        subtitle
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </slot>
              </div>
            </div>

            <v-card
              :color="
                $vuetify.theme.isDark ? 'grey darken-4' : 'grey lighten-3'
              "
              elevation="0"
              class="mx-2 rounded-lg mb-1"
            >
              <v-card-text class="px-1">
                <v-list
                  dense
                  color="transparent"
                  :class="{ 'py-0': $vuetify.breakpoint.smAndDown }"
                  @click="cerrar()"
                >
                  <slot name="options" v-bind:close="cerrar"></slot>
                </v-list>
              </v-card-text>
            </v-card>
          </v-list>
        </v-sheet>
      </v-bottom-sheet>
    </div>

    <v-menu
      class="rounded-lg"
      v-model="show"
      :position-x="x"
      :position-y="y"
      :absolute="absolute"
      :offset-y="offsety"
      :offset-x="offsetx"
      max-width="300"
      @blur="quitar"
    >
      <v-list dense class="rounded-lg">
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
          class="pt-0 rounded-lg"
          :class="{ 'py-0': $vuetify.breakpoint.smAndDown }"
        >
          <v-list dense>
            <slot name="options" v-bind:close="cerrar"></slot>
          </v-list>
        </v-list>
      </v-list>
    </v-menu>
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
    absolute: {
      type: Boolean,
      default: true,
    },
    offsetx: {
      type: Boolean,
      default: true,
    },
    offsety: {
      type: Boolean,
      default: true,
    },
    flex_center: {
      type: Boolean,
      default: true,
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
      if (this.absolute) {
        this.x = e.clientX;
        this.y = e.clientY;
      } else {
        setTimeout(() => {
          console.log(this.$refs.activator.getBoundingClientRect().right);
          this.x = this.offsetx
            ? this.$refs.activator.getBoundingClientRect().right
            : this.$refs.activator.getBoundingClientRect().x;
          this.y = this.offsety
            ? this.$refs.activator.getBoundingClientRect().bottom
            : this.$refs.activator.getBoundingClientRect().y;
        }, 20);
      }
      setTimeout(() => {
        this.show = true;
      }, 30);
    },
    quitar() {
      console.log("cerrado");
    },
    cerrar() {
      this.show = false;
      //console.log("Movimiento");
    },
  },
};
</script>

<style></style>
