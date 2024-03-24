<template>
    <div>
        <v-card :outlined="false" :elevation="elevation" tile>
            <v-card-text class="pa-0">
                <v-row dense>
                    <v-col cols="12" sm="8" class="py-0">
                        <v-text-field
                            :type="type"
                            class="rounded-lg"
                            outlined
                            height="60"
                            style="font-size: 25px"
                            :label="label + ' [CTRL+Q]'"
                            v-shortkey="['ctrl', 'q']"
                            @shortkey.native="skBuscarCodigo"
                            v-model="search"
                            ref="buscarCodigo"
                            prepend-icon="mdi-barcode"
                            placeholder="Ingrese el Codigo"
                            @keyup.enter="realizarBusqueda(0)"
                            @click:append-outer="cerrar()"
                            :append-outer-icon="
                                close ? 'mdi-chevron-right' : ''
                            "
                        >
                        </v-text-field>
                    </v-col>

                    <v-col :cols="actions ? 6 : 12" :sm="actions ? 2 : 4">
                        <div class="d-flex justify-center align-center mb-2">
                            <v-btn
                                outlined
                                block
                                large
                                color="primary"
                                @click="realizarBusqueda(0)"
                                :loading="isLoading"
                                v-shortkey="['ctrl', 'b']"
                                @shortkey.native="realizarBusqueda(0)"
                            >
                                Buscar [CTRL+B]
                                <v-icon right>mdi-cloud-search-outline</v-icon>
                            </v-btn>
                        </div>
                    </v-col>

                    <v-col cols="6" sm="2" v-if="actions">
                        <div class="d-flex justify-center align-center mb-2">
                            <slot> </slot>
                        </div>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
export default {
    props: {
        close: {
            type: Boolean,
            default: false,
        },
        icon: {
            type: String,
            default: "mdi-magnify",
        },
        placeholder: {
            type: String,
            default: "Buscar:",
        },
        prefix: {
            type: String,
            default: "q",
        },
        time: {
            type: Number,
            default: 1000,
        },
        elevation: {
            type: Number,
            default: 3,
        },
        outlined: {
            type: Boolean,
            default: true,
        },
        actions: {
            type: Boolean,
            default: true,
        },
        autofocus: {
            type: Boolean,
            default: true,
        },
        type: {
            type: String,
            default: "text",
        },
        label: {
            type: String,
            default: "Código de Barras",
        },
    },
    mounted() {
        if (this.final) {
            this.search = this.final;
        }
        this.ready = true;
        if (this.autofocus) {
            this.skBuscarCodigo();
        }
    },
    data: () => ({
        isLoading: false,
        search: "",
        ready: false,
        timer: null,
        updates: 0,
    }),
    methods: {
        realizarBusqueda(n = this.time) {
            this.isLoading = true;
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
            this.timer = setTimeout(() => {
                this.final = this.search;
                this.isLoading = false;
            }, n);
        },
        actualizarRuta(parametro, nuevoValor, del = false) {
            let query = this.$route.query;

            if (del) {
                delete query[parametro];
            } else {
                query[parametro] = nuevoValor.toString();
            }

            this.$router
                .replace({
                    query: { ...query, t: this.updates++ },
                })
                .catch(() => {});
        },
        cerrar() {
            this.$emit("close", false);
        },
        skBuscarCodigo() {
            this.$refs.buscarCodigo.$refs.input.select();
            this.$refs.buscarCodigo.$refs.input.focus();
        },

        skLimpiar() {
            this.codigo = "";
            this.isLoading = false;
            this.isNew = false;
            this.isFound = false;
            this.$refs.buscarCodigo.$refs.input.focus();
        },
        skEnfocarTextField(n) {
            this.$refs[n].$refs.input.select();
            this.$refs[n].$refs.input.focus();
        },
    },
    computed: {
        final: {
            get: function () {
                return this.$route.query[this.prefix] || "";
            },
            set: function (nuevoValor) {
                if (nuevoValor == null) {
                    this.actualizarRuta(this.prefix, "", true);
                } else {
                    this.actualizarRuta(
                        this.prefix,
                        nuevoValor,
                        nuevoValor == ""
                    );
                }
            },
        },
    },
    watch: {
        search() {
            //console.log(this.ready + " - " + this.search);
            if (this.ready) {
                this.realizarBusqueda();
            } else {
                this.ready = true;
            }
        },
        final() {
            //this.ready = false;
            this.search = this.final;
        },
    },
};
</script>

<style></style>
