<template>
  <div>
    <v-card class="text-center rounded-lg" elevation="6">
      <v-card-text class="pb-0">
        <img class="pt-3" src="~/static/images/lerniz_logo.png" width="100" />
        <v-card-title class="justify-center display-1 mb-2">
          Iniciar Sesión
        </v-card-title>
      </v-card-text>

      <v-card-text class="pt-0">
        <v-form ref="login" lazy-validation>
          <v-row>
            <v-col cols="12" md="12" class="pb-0 pt-0">
              <v-text-field
                @keyup.enter="login()"
                v-model="usuario"
                :disabled="isLoading"
                :rules="[rules.correo]"
                autocomplete="off"
                placeholder="Usuario"
                name="correo"
                outlined
                dense
                prepend-icon="mdi-account-outline"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="pt-0">
              <v-text-field
                @keyup.enter="login()"
                prepend-icon="mdi-lock-outline"
                autocomplete="off"
                v-model="password"
                :rules="[rules.password]"
                :disabled="isLoading"
                :type="showPassword ? 'text' : 'password'"
                name="password"
                outlined
                placeholder="Contraseña/Pin/Año de Nacimiento"
                :append-icon="
                  showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
                "
                @click:append="showPassword = !showPassword"
                dense
              ></v-text-field>
            </v-col>
          </v-row>
          <v-alert dense v-if="error.status" text type="error">
            {{ error.msg }}
          </v-alert>

          <v-row class="pb-0 my-0">
            <v-col cols="12" class="">
              <v-btn
                block
                :loading="isLoading"
                depressed
                color="primary"
                @click="login()"
              >
                Iniciar Sesión
              </v-btn>
            </v-col>
            <v-col cols="12" class="pt-0">
              <v-btn
                block
                :loading="isLoading"
                @click="verPadre()"
                depressed
                color="superior"
                text
              >
                Reporte de Estudiante
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
        <v-alert
          v-if="!estado"
          type="error"
          color="red darken-3"
          class="mt-2"
          icon="mdi-database-alert-outline"
          text
        >
          <strong>Oh no!</strong> Estamos experimentando inconvenientes con
          nuestros sistemas pero ya estamos trabajando para restablecer todo a
          la normalidad lo antes posible, intenta ingresar en 15 minutos.
        </v-alert>
        <div class="mt-5" v-if="false">
          <router-link :to="localePath('/auth/forgot-password')">
            {{ $t("login.forgot") }}
          </router-link>
        </div>
      </v-card-text>
    </v-card>

    <div v-if="false" class="text-center mt-6">
      ¿No tienes una cuenta?
      <router-link :to="localePath('/registro')" class="font-weight-bold">
        Registrate
      </router-link>
    </div>
    <v-dialog v-model="padres" width="500">
      <v-card class="rounded-lg">
        <v-card-title
          style="display: flex; justify-content: center; align-items: center"
        >
          <div>Sin Información</div>
        </v-card-title>
        <v-card-text class="text-center">
          <div
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              margin-top: 10px;
              margin-bottom: 20px;
            "
          >
            <l-illustration
              height="150"
              ilustration="no-data.svg"
            ></l-illustration>
          </div>
          Aún no hay información disponible del estudiante
        </v-card-text>
        <v-card-actions>
          <v-btn block @click="padres = false"> Entendido </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import LIllustration from "../components/generales/lIllustration.vue";
import loginVue from "../layouts/login.vue";
import { mapActions } from "vuex";
export default {
  components: { LIllustration },
  layout: "login",
  mounted() {
    this.$cookies.set("auth", false);
    this.$cookies.set("alumno", 0);
    this.$cookies.set("SSIDAD", 0);
    this.$cookies.set("SSIDPR", 0);
    this.$cookies.set("SSIDCO", 0);
    this.$cookies.set("SSIDAL", 0);
    localStorage.clear();
    this.revisarSistemas();
  },
  data() {
    return {
      padres: false,
      isLoading: false,
      estado: true,
      usuario: "",
      password: "",
      error: {
        status: false,
        msg: "",
      },
      showPassword: false,
      rules: {
        correo: (value) =>
          (value && Boolean(value)) ||
          "Ingresa tu usuario o correo electrónico",
        password: (value) =>
          (value && Boolean(value)) || "Ingresa tu contraseña",
      },
    };
  },
  methods: {
    ...mapActions({ getLogin: "aplicacion/getLogin" }),
    verPadre() {
      if (this.$refs.login.validate()) {
        this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
          this.padres = true;
        }, 1200);
      }
    },
    async login() {
      if (this.$refs.login.validate()) {
        this.isLoading = true;
        let response = await this.getLogin({
          usuario: this.usuario,
          password: this.password,
        })
          .then((result) => {
            if (!this.redireccion) {
              this.$router.push({ path: "/inicio" });
            } else {
              this.$router.push({ path: this.redireccion });
            }
          })
          .catch((err) => {
            this.error.status = true;
            this.error.msg = err.response.data;
          });
        this.isLoading = false;
      }
    },
    revisarSistemas() {
      return this.$axios
        .get("sistemas")
        .then(() => {
          ///todo ok
        })
        .catch((err) => {
          this.estado = false;
        });
    },
  },
  computed: {
    redireccion: function () {
      return this.$route.query.redirect;
    },
    logo() {
      return require("@/static/images/lerniz_logo.png").default;
    },
  },
  head() {
    return {
      title: "Iniciar Sesión",
    };
  },
};
</script>
