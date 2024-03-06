<template>
    <div>
        <v-card class="text-center rounded-lg" elevation="0">
            <v-card-text class="pb-0">
                <v-card-title class="justify-center display-1 mb-2">
                    <div
                        style="height: 100px"
                        class="d-flex justify-center align-center"
                    >
                        POS LERNIZ
                    </div>
                </v-card-title>
            </v-card-text>

            <v-card-text class="pt-0">
                <v-form ref="login" lazy-validation>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-text-field
                                @keyup.enter="login()"
                                v-model="usuario"
                                :disabled="isLoading"
                                :rules="[rules.correo]"
                                autocomplete="off"
                                placeholder="Usuario"
                                name="correo"
                                outlined
                                prepend-icon="mdi-account-outline"
                                hide-details=""
                                class="rounded-lg"
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
                                placeholder="Contraseña"
                                :append-icon="
                                    showPassword
                                        ? 'mdi-eye-off-outline'
                                        : 'mdi-eye-outline'
                                "
                                @click:append="showPassword = !showPassword"
                                class="rounded-lg"
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
                                large
                                color="primary"
                                @click="login()"
                            >
                                Acceder
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-form>
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
                        this.$cookie.set(
                            "token",
                            "Bearer " + result.data.token
                        );
                        this.$cookie.set("tipo", result.data.sstype);
                        this.$router.push("/tienda");
                        console.log(result.data);
                    })
                    .catch((err) => {
                        this.error.msg =
                            "Ha ocurrido un error al iniciar sesión";
                        this.error.status = true;
                        console.log(err.response.data);
                    });
            }
            this.isLoading = false;
        },
    },
};
</script>
