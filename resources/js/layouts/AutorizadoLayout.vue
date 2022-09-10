<template>
  <div
    v-shortkey="['ctrl', '/']"
    class="d-flex flex-grow-1"
    @shortkey="onKeyup"
  >
    <!-- Toolbar -->
    <v-app-bar
      app
      :color="isToolbarDetached ? 'surface' : undefined"
      :flat="isToolbarDetached"
      :light="toolbarTheme === 'light'"
      :dark="toolbarTheme === 'dark'"
    >
      <v-card
        class="flex-grow-1 d-flex"
        :class="[isToolbarDetached ? 'pa-1 mt-3 mx-1' : 'pa-0 ma-0']"
        :flat="!isToolbarDetached"
      >
        <div class="d-flex flex-grow-1 align-center">
          <div class="d-flex flex-grow-1 align-center">
            <v-app-bar-nav-icon
              v-if="false"
              @click.stop="drawer = !drawer"
              class="primary"
            ></v-app-bar-nav-icon>
            <v-card elevation="0" to="/tienda" :ripple="false">
              <div class="title font-weight-bold text-uppercase primary--text">
                {{ product.name }}
              </div>
            </v-card>

            <v-spacer class="d-none d-lg-block"></v-spacer>

            <v-btn v-shortkey="['f1']" @shortkey="to('/tienda/productos/verificador')" to="/tienda/productos/verificador" > Verificador [F1] </v-btn>
            <v-btn v-shortkey="['f4']" @shortkey="to('/tienda/vender')" to="/tienda/vender" > Vender [F4] </v-btn>

            <toolbar-user />
          </div>
        </div>
      </v-card>
    </v-app-bar>

    <v-main>
      <slot></slot>
    </v-main>
  </div>
</template>

<script>
import { mapState } from "vuex";

// navigation menu configurations
import config from "../configs";

import MainMenu from "../components/navigation/MainMenu";
import ToolbarUser from "../components/toolbar/ToolbarUser";
import ToolbarApps from "../components/toolbar/ToolbarApps";
import ToolbarLanguage from "../components/toolbar/ToolbarLanguage";
import ToolbarCurrency from "../components/toolbar/ToolbarCurrency";
import ToolbarNotifications from "../components/toolbar/ToolbarNotifications";

export default {
  components: {
    MainMenu,
    ToolbarUser,
    ToolbarApps,
    ToolbarLanguage,
    ToolbarCurrency,
    ToolbarNotifications,
  },
  data() {
    return {
      drawer: null,
      showSearch: false,

      navigation: config.navigation,
    };
  },
  computed: {
    ...mapState("app", [
      "product",
      "isContentBoxed",
      "menuTheme",
      "toolbarTheme",
      "isToolbarDetached",
    ]),
  },
  methods: {
    onKeyup(e) {
      this.$refs.search.focus();
    },
    to(e){
        this.$router.push(e);
    }
  },
};
</script>

<style scoped>
.buy-button {
  box-shadow: 1px 1px 18px #ee44aa;
}
</style>
