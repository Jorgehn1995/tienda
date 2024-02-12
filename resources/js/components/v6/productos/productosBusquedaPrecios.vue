<template>
    <div>
        <div class="">
            <v-row dense>
                <v-col cols="12">
                    <v-form ref="formCodigo" @submit="skEstablecerBusqueda">
                        <v-card outlined :elevation="elevation" tile>
                            <v-card-text>
                                <v-row dense>
                                    <v-col cols="12" class="pb-0">
                                        <v-text-field
                                            height="60"
                                            style="font-size: 25px"
                                            label="Código de Barras o Nombre del Producto [CTRL+Q]"
                                            outlined
                                            v-shortkey="['ctrl', 'q']"
                                            @shortkey.native="skEnfocarCodigo"
                                            v-model="search"
                                            :rules="[rules.requerido]"
                                            ref="buscarCodigo"
                                            prepend-icon="mdi-barcode"
                                            placeholder="Ingrese el Codigo [CTRL+Q]"
                                            @keypress.enter="
                                                skEstablecerBusqueda
                                            "
                                        ></v-text-field>
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        class="d-flex align-center"
                                    >
                                        <v-btn
                                            outlined
                                            color="primary"
                                            class="ml-2"
                                            @click="skEstablecerBusqueda"
                                            :loading="isLoading"
                                        >
                                            Buscar [ENTER]
                                        </v-btn>

                                        <v-btn
                                            outlined
                                            color="grey"
                                            class="ml-2"
                                            @click="skLimpiar"
                                            :loading="isLoading"
                                            v-shortkey="['ctrl', 'l']"
                                            @shortkey.native="skLimpiar"
                                        >
                                            Limpiar[CTRL + L]
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-form>
                </v-col>
                <v-col
                    cols="12"
                    class="d-flex justify-center align-center"
                    v-if="isLoading"
                >
                    <v-progress-circular
                        color="primary"
                        indeterminate
                    ></v-progress-circular>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
import ProductosPrecios from "../../../components/tienda/productos/productosPrecios.vue";
import VNiceModal from "../../../components/tienda/generales/v-nice-modal.vue";
export default {
    components: { VNiceModal, ProductosPrecios },
    props: {
        elevation: {
            default: 3,
        },
    },
    mounted() {
        this.$refs.buscarCodigo.$refs.input.focus();
        if (this.$route.query.codigo) {
            this.search = this.$route.query.codigo;
            this.$nextTick(() => {
                this.skBuscar();
            });
        }
    },
    data: () => ({
        isLoading: false,
        search: "",
        data: [],
        rules: {
            requerido: (v) => !!v || "Campo Requerido",
            min40: (v) =>
                (v && v.length <= 40) ||
                "La información no deben superar los 40 caracteres",
            min200: (v) =>
                (v && v.length <= 200) ||
                "La información no deben superar los 200 caracteres",
            min0: (v) =>
                (v >= 0 && v <= 10000) || "El campo estas entre 0 y 10000",
        },
    }),
    methods: {
        skEnfocarCodigo() {
            this.$refs.buscarCodigo.$refs.input.select();
            this.$refs.buscarCodigo.$refs.input.focus();
            this.search = "";
        },
        skEstablecerBusqueda(e) {
            if (e) {
                e.preventDefault();
            }
            //let searchString = String(this.search);
            let signo = this.search.substring(0, 1);
            if (signo == "+") {
                this.$emit(
                    "suma",
                    this.search.substring(1, this.search.length)
                );
                this.skEnfocarCodigo();
                return;
            } else if (signo == "*") {
                this.$emit(
                    "multi",
                    this.search.substring(1, this.search.length)
                );
                this.skEnfocarCodigo();
                return;
            } else {
                if (Number.isFinite(Number(this.search))) {
                    this.skBuscarCodigo();
                } else {
                    this.skBuscarTexto();
                }
            }
        },
        async skBuscarCodigo(e) {
            if (e) {
                e.preventDefault();
            }
            if (this.$refs.formCodigo.validate()) {
                this.isLoading = true;
                this.$axios
                    .get("/productos/presentaciones?codigo=" + this.search)
                    .then((result) => {
                        this.isLoading = false;
                        this.$emit("portexto", result.data);
                        this.skEnfocarCodigo();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        },
        async skBuscarTexto(e) {
            if (e) {
                e.preventDefault();
            }
            if (this.$refs.formCodigo.validate()) {
                this.isLoading = true;
                this.$axios
                    .get("/productos/presentaciones?search=" + this.search)
                    .then((result) => {
                        this.isLoading = false;
                        this.$emit("portexto", result.data.data);

                        this.$refs.buscarCodigo.$refs.input.focus();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        },
        skLimpiar() {
            this.search = "";
            this.$refs.buscarCodigo.$refs.input.focus();
        },
    },
    computed: {
        id() {
            return this.$route.query.id || 0;
        },
    },
};
</script>

<style></style>
