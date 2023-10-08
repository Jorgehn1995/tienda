<template>
    <div>
        <div class="mb-2">
            <div>
                <v-row dense>
                    <v-col
                        cols="12"
                        sm="3"
                        md="3"
                        class="pr-0"
                        :class="
                            $vuetify.breakpoint.xsOnly
                                ? 'd-flex justify-center'
                                : 'd-flex justify-left align-center'
                        "
                    >
                        <div class="title font-weight-bold superior--text">
                            <slot
                                name="toolbar.name"
                                :seleccion="seleccion"
                                :reload="iniciar"
                                :isReloading="isReloading"
                            >
                                Toolbar
                            </slot>
                        </div>
                    </v-col>
                    <v-col cols="12" sm="6" md="6" class="px-0">
                        <slot
                            name="toolbar.center"
                            v-bind:seleccion="seleccion"
                        ></slot>
                    </v-col>
                    <v-col cols="12" sm="3" md="3" class="px-0">
                        <div>
                            <v-search-field
                                v-model="search"
                                :name="tableID"
                                :mini_disabled="true"
                            ></v-search-field>
                        </div>
                    </v-col>
                </v-row>
            </div>
        </div>
        <div>
            <v-card elevation="0" class="rounded-lg" v-if="isLoading">
                <v-skeleton-loader
                    type="list-item-avatar-two-line"
                ></v-skeleton-loader>
            </v-card>

            <v-item-group multiple v-else-if="this.data.length > 0">
                <v-row dense>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                        v-for="(item, index) in data"
                        :key="'dt' + index"
                    >
                        <v-item :value="item[itemID]">
                            <v-hover v-slot="{ hover }">
                                <v-card
                                    class="rounded-lg pa-0"
                                    color=" cursor-pointer"
                                    outlined
                                    :elevation="
                                        isSelected(item[itemID]) || hover
                                            ? 3
                                            : 0
                                    "
                                    height="100%"
                                >
                                    <slot
                                        name="item"
                                        :item="item"
                                        :isSelected="isSelected"
                                        :toggle="toggle"
                                        :index="index"
                                    ></slot>
                                </v-card>
                            </v-hover>
                        </v-item>
                    </v-col>
                </v-row>
            </v-item-group>
            <v-card elevation="0" class="rounded-lg" v-else>
                <v-card-text>
                    <v-list>
                        <v-list-item>
                            <v-list-item-icon>
                                <v-icon>mdi-archive-off-outline</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>Sin datos</v-list-item-title>
                                <v-list-item-subtitle>
                                    No se han encontrado registros
                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-card-text>
            </v-card>
        </div>

        <v-row dense v-if="!isLoading">
            <v-col cols="12" sm="6">
                <v-menu offset-y offset-x>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            v-bind="attrs"
                            v-on="on"
                            elevation="0"
                            class="ma-1"
                        >
                            Mostrando: {{ limit }} registros
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item
                            v-for="(item, index) in [60, 80, 100]"
                            :key="index"
                            @click="limit = item"
                        >
                            <v-list-item-title>{{ item }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-col>
            <v-col cols="12" sm="6">
                <v-pagination
                    v-model="page"
                    :length="paginas"
                    prev-icon="mdi-menu-left"
                    next-icon="mdi-menu-right"
                ></v-pagination>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import VSearchField from "./v-search-field.vue";

import { mapActions, mapGetters } from "vuex";
export default {
    components: { VSearchField },

    props: {
        tableID: {
            type: String,
            default: "lerniz",
        },
        itemID: {
            type: String,
            required: true,
        },
        apiURL: {
            type: String,
            required: true,
        },
        extraQuery: {
            type: String,
            default: "",
        },
        "show-select": {
            type: Boolean,
            default: false,
        },
        "show-expand": {
            type: Boolean,
            default: false,
        },
        "auto-select": {
            type: Boolean,
            default: false,
        },
        pagination: {
            type: [Number, String],
            default: 10,
        },
        top: {
            type: [Number, String],
            default: 250,
        },
        truncate: {
            type: Boolean,
            default: false,
        },
        "toggle-columns": {
            type: Boolean,
            default: false,
        },
        "show-menu": {
            type: Boolean,
            default: false,
        },
        prefix: {
            type: String,
            default: "t",
        },
    },

    mounted() {
        this.$emit("update:search", this.search);
        this.iniciar();
    },
    data: () => ({
        isLoading: false,
        isReloading: false,
        seleccion: [],
        seccion: false,
        menu: {
            origin: 0,
            show: false,
            x: 0,
            y: 0,
            item: {},
        },
        ajustes: {
            updates: 0,
        },
        shift: -1,
    }),
    methods: {
        ...mapActions({ obtenerDatos: "listar/obtenerDatos" }),
        async iniciar() {
            this.isLoading = true;
            this.isReloading = true;
            if (this.data.length == 0) {
                await this.obtenerDatos({
                    ruta: this.ruta,
                    busqueda: this.search,
                });
                this.isReloading = false;
            } else {
                this.obtenerDatos({ ruta: this.ruta, busqueda: this.search })
                    .then((result) => {
                        this.isReloading = false;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }

            //await this.$api4
            //  .get(this.ruta)
            //  .then((result) => {
            //    this.data = result.data;
            //  })
            //  .catch((err) => {
            //    console.log(err);
            //  });

            this.isLoading = false;
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
                    query: { ...query, t: this.ajustes.updates++ },
                })
                .catch(() => {});
        },
        isSelected(id) {
            return this.seleccion.findIndex((s) => s == id) >= 0;
        },
        toggle(e, ix, item) {
            let id = item[this.itemID];
            if (e.shiftKey) {
                if (this.shift >= 0 && this.shift != ix) {
                    let inicio = this.shift;
                    let fin = ix;
                    if (inicio > fin) {
                        let temp_inicio = inicio;
                        inicio = fin;
                        fin = temp_inicio;
                    }

                    for (let index = 0; index < this.data.length; index++) {
                        let itemIndex = this.seleccion.findIndex(
                            (s) => s == this.data[index][this.itemID]
                        );

                        if (index >= inicio && index <= fin) {
                            if (itemIndex < 0) {
                                this.seleccion.push(
                                    this.data[index][this.itemID]
                                );
                            }
                        } else {
                            if (itemIndex >= 0) {
                                this.seleccion.splice(itemIndex, 1);
                            }
                        }
                    }
                    this.shift = -1;
                }
            } else if (e.ctrlKey) {
                for (let index = 0; index < this.data.length; index++) {
                    let itemIndex = this.seleccion.findIndex(
                        (s) => s == this.data[index][this.itemID]
                    );

                    if (itemIndex >= 0) {
                        this.seleccion.splice(itemIndex, 1);
                    }
                }
                //this.seleccion.push(id);
                this.shift = -1;
            } else {
                let i = this.seleccion.findIndex((s) => s == id);
                if (i >= 0) {
                    this.seleccion.splice(i, 1);
                } else {
                    this.seleccion.push(id);
                    this.shift = ix;
                }
            }
        },
    },
    computed: {
        ...mapGetters({ listado: "listar/listar" }),
        data() {
            return (
                this.listado({
                    ruta: this.ruta,
                    tipo: "data",
                }) || []
            );
        },
        paginas() {
            return (
                this.listado({
                    ruta: this.ruta,
                    tipo: "paginas",
                }) || 0
            );
        },
        ruta() {
            return (
                this.apiURL +
                "?page=" +
                this.page +
                "&sortBy=" +
                (this.sortBy == "" ? "created_at" : this.sortBy) +
                "&sortDesc=" +
                (this.sortDesc ? "desc" : "asc") +
                "&limit=" +
                this.limit +
                "&search=" +
                this.search +
                this.extraQuery
            );
        },

        page: {
            get: function () {
                return parseInt(this.$route.query[this.prefix + "p"]) || 1;
            },
            set: function (nuevoValor) {
                this.shift = -1;
                this.actualizarRuta(this.prefix + "p", nuevoValor, false);
            },
        },
        sortBy: {
            get: function () {
                return this.$route.query[this.prefix + "sb"] || "";
            },
            set: function (nuevoValor) {
                this.actualizarRuta(
                    this.prefix + "sb",
                    nuevoValor,
                    nuevoValor == "" || nuevoValor == undefined
                );
            },
        },
        sortDesc: {
            get: function () {
                return this.$route.query[this.prefix + "sd"] == "true";
            },
            set: function (nuevoValor) {
                this.actualizarRuta(this.prefix + "sd", !!nuevoValor);
            },
        },
        limit: {
            get: function () {
                return (
                    parseInt(this.$route.query[this.prefix + "l"]) ||
                    this.pagination
                );
            },
            set: function (nuevoValor) {
                this.actualizarRuta(
                    this.prefix + "l",
                    nuevoValor,
                    nuevoValor == ""
                );
            },
        },
        search: {
            get: function () {
                return this.$route.query[this.prefix + "s"] || "";
            },
            set: function (nuevoValor) {
                this.page = 1;
                this.actualizarRuta(
                    this.prefix + "s",
                    nuevoValor,
                    nuevoValor == ""
                );
            },
        },
    },
    watch: {
        search() {
            this.iniciar();
        },
        page() {
            this.iniciar();
            this.$vuetify.goTo(0);
        },
        limit() {
            this.iniciar();
            this.$vuetify.goTo(0);
        },
        sortBy() {
            this.iniciar();
        },
        sortDesc() {
            this.iniciar();
        },
        seleccion() {
            this.$emit("update:seleccion", this.seleccion);
        },
        extraQuery() {
            this.page = 1;
            this.iniciar();
        },
    },
};
</script>

<style lang="css" scoped>
.row-pointer >>> tbody tr :hover {
    cursor: pointer;
}
</style>
<style>
.v-data-table.row-height-50 td {
    height: 40px !important;
}
#servertable td {
    max-width: 1px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.sombra-bottom {
    -webkit-box-shadow: inset -14px -34px 26px -24px rgba(0, 0, 0, 0.54);
    box-shadow: inset -14px -34px 26px -24px rgba(0, 0, 0, 0.54);
}
</style>
