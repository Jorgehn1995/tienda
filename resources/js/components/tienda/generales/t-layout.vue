
<template>
  <div class="d-flex flex-grow-1 flex-row mx-2">
    <div class="d-flex flex-grow-1 flex-column">
      <slot name="right.title" v-bind:drawer="drawer">
        <v-toolbar
          v-if="toolbar"
          class="hidden-lg-and-up rounded-lg flex-grow-0 mb-2 transparent"
          elevation="0"
          @click="drawer = !drawer"
        >
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
          <div class="title font-weight-bold">
            <slot name="right.menu.title"> Menu </slot>
          </div>
        </v-toolbar>
      </slot>
      <div class="flex-grow-1">
        <slot name="right.head"></slot>
        <v-row>
          <v-col cols="12" sm="12" md="10" lg="10" xl="8" offset-md="1" offset-lg="1" offset-xl="2">
            <slot name="right.body" v-bind:openDrawer="openDrawer"> </slot>
          </v-col>
        </v-row>
      </div>
    </div>
    <v-navigation-drawer
      v-if="left"
      v-model="drawer"
      color="background"
      :app="$vuetify.breakpoint.mdAndDown"
      :permanent="$vuetify.breakpoint.lgAndUp"
      floating
      class="elevation-0 flex-shrink-0 pa-0 mt-0 pt-0"
      :class="[
        $vuetify.rtl ? 'ml-3' : 'mr-3',
        !$vuetify.breakpoint.smAndDown
          ? 'rounded-lg v-sheet--outlined'
          : 'tile',
      ]"
      width="250"
    >
      <div class="px-2 py-0">
        <div class="subtitle font-weight-bold grey--text text--darken-3" >
          <slot name="left.title">Titulo</slot>
        </div>
        <div class="overline" v-if="false">1.0.0</div>
      </div>
      <slot name="left.body"></slot>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  props: {
    left: {
      type: Boolean,
      default: true,
    },
    toolbar: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    isLoading: false,
    drawer: false,
  }),
  methods: {
    openDrawer() {
      this.drawer = true;
    },
  },
};
</script>

<style>
</style>
