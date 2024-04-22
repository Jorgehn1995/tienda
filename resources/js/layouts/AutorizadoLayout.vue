<template>
  <div
    v-shortkey="['ctrl', '/']"
    class="d-flex flex-grow-1"
    @shortkey="onKeyup"
  >
    <v-navigation-drawer v-model="drawer" clipped app>
      <template v-slot:prepend>
        <v-card tile height="122">
          <v-card-text>
            <v-list-item to="/tienda/drawer">
              <v-list-item-content>
                <v-list-item-subtitle>
                  {{ moment().format("D/M/Y") }}
                </v-list-item-subtitle>
                <v-list-item-title class="text-h6">
                  Farmacias Oasis
                </v-list-item-title>
                <v-list-item-subtitle>
                  San Luis Jilotepeque
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card-text>
        </v-card>
        <v-divider></v-divider>
      </template>
      <v-list>
        <v-list-item to="/tienda/inicio" active-class="primary--text">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Inicio</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/tienda/turnos" active-class="primary--text">
          <v-list-item-icon>
            <v-icon>mdi-sun-clock-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title> Turnos</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/tienda/vender" active-class="primary--text">
          <v-list-item-icon>
            <v-icon>mdi-cart-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title> Vender</v-list-item-title>
        </v-list-item>
        <v-list-item
          link
          to="/tienda/productos/vencimientos"
          active-class="primary--text"
          v-if="tipo > 1"
        >
          <v-list-item-icon>
            <v-icon>mdi-calendar-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title> Vencimientos</v-list-item-title>
        </v-list-item>
        <v-list-item
          link
          to="/tienda/productos/existencias"
          active-class="primary--text"
          v-if="tipo > 1"
        >
          <v-list-item-icon>
            <v-icon>mdi-package-variant-closed-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-title> Agregar Producto</v-list-item-title>
        </v-list-item>
        <v-list-item
          link
          to="/tienda/usuarios"
          active-class="primary--text"
          v-if="tipo == 1"
        >
          <v-list-item-icon>
            <v-icon>mdi-account-circle-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title> Usuarios</v-list-item-title>
        </v-list-item>

        <v-list-group
          no-action
          prepend-icon="mdi-package-variant-closed"
          active-class="primary--text"
          v-if="tipo == 1"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Productos</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            to="/tienda/productos/inicio"
            active-class="primary--text"
          >
            <v-list-item-title> Productos</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/tienda/productos/existencias">
            <v-list-item-title> Agregar Existencias </v-list-item-title>
          </v-list-item>
          <v-list-item link to="/tienda/productos/vencimientos">
            <v-list-item-title> Revisar Vencimientos </v-list-item-title>
          </v-list-item>
          <v-list-item
            to="/tienda/productos/importar"
            active-class="primary--text"
          >
            <v-list-item-title> Importar</v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-item
          link
          to="/tienda/cajas"
          active-class="primary--text"
          v-if="tipo == 1"
        >
          <v-list-item-icon>
            <v-icon>mdi-cellphone-link</v-icon>
          </v-list-item-icon>
          <v-list-item-title> Dispositivos</v-list-item-title>
        </v-list-item>

        <v-list-group
          no-action
          prepend-icon="mdi-package-variant-closed"
          v-if="tipo == 1"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Reportes</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item to="/tienda/reportes">
            <v-list-item-icon>
              <v-icon>mdi-clipboard-list-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title> Ventas</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="false">
            <v-list-item-icon>
              <v-icon>mdi-clipboard-list-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title> Productos</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="false">
            <v-list-item-icon>
              <v-icon>mdi-clipboard-list-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title> Cajas</v-list-item-title>
          </v-list-item>
          <v-list-item link v-if="false">
            <v-list-item-icon>
              <v-icon>mdi-package-variant-closed-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title> Usuarios </v-list-item-title>
          </v-list-item>
          <v-list-item link v-if="false">
            <v-list-item-icon>
              <v-icon>mdi-package-variant-closed-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title> Vencimientos </v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      clipped-left
      clipped-right
      color="surface"
      elevation="3"
      height="64"
      :flat="isToolbarDetached"
      dark
    >
      <v-card
        color="surface"
        dark
        class="flex-grow-1 d-flex"
        :class="[isToolbarDetached ? 'pa-1 mt-3 mx-1' : 'pa-0 ma-0']"
        elevation="0"
      >
        <div class="d-flex flex-grow-1 align-center">
          <div class="d-flex flex-grow-1 align-center">
            <v-app-bar-nav-icon
              @click.stop="drawer = !drawer"
              class="mr-2"
            ></v-app-bar-nav-icon>
            <v-card
              color="surface"
              dark
              elevation="0"
              class="mr-2"
              to="/tienda"
              :ripple="false"
            >
              <div class="white--text title font-weight-bold text-uppercase">
                <v-img
                  v-if="$vuetify.breakpoint.mdAndUp"
                  src="/images/lg_bar.png"
                  contain
                  width="100"
                  height="50"
                ></v-img>

                <v-img
                  v-else
                  src="/images/lg_bar_sm.png"
                  contain
                  width="50"
                  height="50"
                ></v-img>
              </div>
            </v-card>
            <v-btn
              color="secondary darken-2"
              class="ml-2"
              v-shortkey="['f4']"
              @shortkey="to('/tienda/vender')"
              to="/tienda/vender"
            >
              <v-icon :left="$vuetify.breakpoint.mdAndUp">
                mdi-cart-outline
              </v-icon>
              <span v-if="$vuetify.breakpoint.mdAndUp"> Vender [F4] </span>
            </v-btn>
            <v-spacer class="d-lg-block"></v-spacer>

            <v-btn to="/"> Salir </v-btn>
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
import { mapGetters, mapState } from "vuex";

// navigation menu configurations
import config from "../configs";
import moment from "moment";
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
  beforeMount() {
    if (this.$vuetify.breakpoint.smAndDown) {
      this.drawer = false;
      console.log(this.drawer);
    }
  },
  mounted() {
    if (this.$cookie.get("auth") == "false") {
      this.$router.push("/");
    }

    //let unique = localStorage.getItem("CASH_ID");
    //if (!unique) {
    //    localStorage.setItem("CASH_ID", uuidv4());
    //}
  },
  data() {
    return {
      showSearch: false,
      navigation: config.navigation,
      moment,
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
    ...mapGetters({ getDrawer: "app/getDrawer" }),
    drawer: {
      get: function () {
        return this.getDrawer;
      },
      set: function (draw) {
        this.$store.commit("app/setDrawer", draw);
      },
    },
    tipo() {
      return this.$cookie.get("tipo") || 2;
    },
  },
  methods: {
    onKeyup(e) {
      this.$refs.search.focus();
    },
    to(e) {
      this.$router.push(e);
    },
  },
};
</script>

<style scoped>
.buy-button {
  box-shadow: 1px 1px 18px #ee44aa;
}
</style>
