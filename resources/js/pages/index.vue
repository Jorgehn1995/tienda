<template>
  <div class="d-flex justify-center">
    <v-card
      class="text-center pa-1 rounded-lg"
      elevation="0"
      outlined
      width="350"
      max-width="400"
    >
      <v-card-text class="d-flex justify-center mt-2">
        <v-img src="/images/lg_bar.png" contain width="100" height="50"></v-img>
      </v-card-text>
      <v-card-title class="justify-center subtitle-1 mx-2">
        <span> Inicia Sesión </span>
      </v-card-title>
      <v-card-subtitle class="mb-4">
        Sistemas de Gestión Empresarial
        <kbd class="primary">Lerniz</kbd>
        <br />
        San Luis Jilotepeque
      </v-card-subtitle>

      <v-card-text>
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
                class="rounded-lg"
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
                class="rounded-lg"
                @click:append="showPassword = !showPassword"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-btn
            block
            :loading="isLoading"
            large
            color="primary"
            @click="login()"
          >
            Iniciar Sesión
          </v-btn>
          <div class="error--text mt-2" v-if="error.status">
            {{ error.msg }}
          </div>
          <p class="mt-2">Si no tienes acceso contacta con un administrador</p>
          <v-chip label x-small> POS LERNIZ v0.1.2 </v-chip>
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
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  mounted() {
    this.$cookie.set("auth", false);
    //this.$cookies.set("alumno", 0);
    //this.$cookies.set("SSIDAD", 0);
    //this.$cookies.set("SSIDPR", 0);
    //this.$cookies.set("SSIDCO", 0);
    //this.$cookies.set("SSIDAL", 0);
    //localStorage.clear();
    //this.revisarSistemas();
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
    async login() {
      this.isLoading = true;

      if (this.$refs.login.validate()) {
        await this.$axios
          .post("/login", {
            usuario: this.usuario,
            password: this.password,
          })
          .then((result) => {
            this.$cookie.set("auth", true);
            this.$cookie.set("token", "Bearer " + result.data.token);
            this.$cookie.set("tipo", result.data.sstype);
            this.$router.push("/tienda");
            console.log(result.data);
          })
          .catch((err) => {
            this.error.msg = "Ha ocurrido un error al iniciar sesión";
            this.error.status = true;
            console.log(err.response.data);
          });
      }
      this.isLoading = false;
    },
  },
};
</script>
