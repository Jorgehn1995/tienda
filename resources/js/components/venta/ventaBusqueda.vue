<template>
    <div>
        <busqueda-text-field
            prefix="v_search"
            :elevation="0"
            :actions="false"
        ></busqueda-text-field>
        <div
            :style="'height: calc(100vh - ' + height + '); overflow-y: auto'"
            class="px-1"
            ref="panel"
        >
            <v-row dense>
                <v-col cols="12" v-if="search">
                    <t-listar
                        ref="tabla"
                        tableID="actividades.profesores"
                        prefix="v_"
                        show-select
                        show-expand
                        toggle-columns
                        :extraQuery="extraQuery"
                        :apiURL="ajustes.ruta"
                        :itemID="ajustes.id"
                        @click:row="ver($event)"
                        @update:seleccion="carrito = $event"
                        :truncate="true"
                        :show_menu="true"
                        :pagination="50"
                        :toolbar="false"
                        :lg="12"
                        :md="12"
                    >
                        <template
                            v-slot:item="{ isSelected, toggle, item, index }"
                        >
                            <v-card
                                elevation="0"
                                class="cursor-pointer"
                                :class="
                                    seleccionado == index
                                        ? 'selected-card'
                                        : 'unselected-card'
                                "
                                @click="agregarProducto(index)"
                                :ref="'pre' + index"
                            >
                                <v-card-text>
                                    <v-row dense>
                                        <v-col cols="12" md="2">
                                            <div
                                                class="d-flex align-center justify-space-between"
                                            >
                                                <v-icon>mdi-barcode</v-icon>
                                                <span>
                                                    {{ item.producto.codigo }}
                                                </span>
                                            </div>
                                        </v-col>
                                        <v-col cols="12" md="5">
                                            <div
                                                class="d-flex justify-center align-center flex-column"
                                            >
                                                <span
                                                    class="text-h6 font-weight-black"
                                                >
                                                    {{ item.producto.nombre }}
                                                    {{
                                                        item.producto.dimension
                                                    }}
                                                </span>
                                                <span
                                                    class="subtitle-2 font-weight-black"
                                                    :class="
                                                        colores[
                                                            item.idproducto % 6
                                                        ] + '--text '
                                                    "
                                                >
                                                    {{ item.producto.marca }}
                                                </span>
                                            </div>
                                        </v-col>

                                        <v-col cols="12" md="3">
                                            <div
                                                class="d-flex justify-center align-center flex-column"
                                            >
                                                <span
                                                    class="text-h6 font-weight-black"
                                                >
                                                    {{ item.nombre }}
                                                </span>
                                                <span
                                                    class="subtitle-2 font-weight-black"
                                                >
                                                    {{ item.cantidad }}
                                                    {{ item.producto.unidades }}
                                                </span>
                                            </div>
                                        </v-col>
                                        <v-col cols="12" md="2">
                                            <mostrar-precio
                                                v-model="item.precio"
                                            >
                                                <template v-slot:moneda>
                                                    <span
                                                        class="text-h6 font-weight-bold"
                                                    >
                                                        Q
                                                    </span>
                                                </template>
                                                <template
                                                    v-slot:entero="{ entero }"
                                                >
                                                    <span
                                                        class="text-h5 font-weight-bold"
                                                    >
                                                        {{ entero }}.
                                                    </span>
                                                </template>
                                                <template
                                                    v-slot:decimal="{ decimal }"
                                                >
                                                    <span
                                                        class="text-h6 font-weight-bold"
                                                    >
                                                        {{ decimal }}
                                                    </span>
                                                </template>
                                            </mostrar-precio>
                                        </v-col>
                                    </v-row>
                                    <div
                                        class="d-flex justify-space-between"
                                        v-if="false"
                                    >
                                        <div class="d-flex flex-column">
                                            <span
                                                class="undertext black--text font-weight-bold text-h6"
                                            >
                                                {{ item.producto.nombre }}

                                                {{ item.producto.dimension }}
                                                |
                                                <span>
                                                    {{ item.producto.marca }}
                                                </span>
                                            </span>

                                            <div>
                                                <v-icon>mdi-barcode</v-icon>
                                                <span>
                                                    {{ item.producto.codigo }}
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            class="d-flex justify-center align-center flex-column"
                                        >
                                            <span class="text-h6">
                                                {{ item.nombre }}
                                            </span>

                                            <span>
                                                {{ item.cantidad }}
                                                {{ item.producto.unidades }}
                                            </span>
                                        </div>
                                        <div>
                                            <mostrar-precio
                                                v-model="item.precio"
                                            >
                                                <template v-slot:moneda>
                                                    <span
                                                        class="text-h6 font-weight-bold"
                                                        style="
                                                            font-family: Helvetica !important;
                                                        "
                                                    >
                                                        Q
                                                    </span>
                                                </template>
                                                <template
                                                    v-slot:entero="{ entero }"
                                                >
                                                    <span
                                                        class="text-h5 font-weight-bold"
                                                    >
                                                        {{ entero }}.
                                                    </span>
                                                </template>
                                                <template
                                                    v-slot:decimal="{ decimal }"
                                                >
                                                    <span
                                                        class="text-h6 font-weight-bold"
                                                    >
                                                        {{ decimal }}
                                                    </span>
                                                </template>
                                            </mostrar-precio>
                                        </div>
                                    </div>
                                </v-card-text>

                                <v-card-text class="px-2" v-if="false">
                                    <v-row dense style="height: 100%">
                                        <v-col cols="12" sm="6" md="6">
                                            <div class="d-flex flex-column">
                                                <div>
                                                    <v-icon>mdi-barcode</v-icon>
                                                    <span>
                                                        {{
                                                            item.producto.codigo
                                                        }}
                                                    </span>
                                                </div>
                                                <div>
                                                    {{ item.cantidad }}
                                                    {{ item.producto.unidades }}
                                                </div>
                                            </div>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <mostrar-precio
                                                v-model="item.precio"
                                            ></mostrar-precio>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </template>
                    </t-listar>
                </v-col>
                <v-col cols="12" v-else>
                    <v-card elevation="0">
                        <v-card-text>
                            <div
                                class="d-flex justify-center align-center flex-column"
                                style="height: calc(100vh - 300px)"
                            >
                                <v-icon size="100" class="grey--text">
                                    mdi-tag-search-outline
                                </v-icon>
                                <br />
                                <span>
                                    Busca un producto por codigo o por
                                    descripción
                                </span>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </div>
        <div v-shortkey="['arrowright']" @shortkey="agregarProducto"></div>
        <div v-shortkey="['arrowleft']" @shortkey="restarProducto"></div>
        <div v-shortkey="['arrowup']" @shortkey="presentacionArriba"></div>
        <div v-shortkey="['arrowdown']" @shortkey="presentacionAbajo"></div>
    </div>
</template>

<script>
import MostrarPrecio from "../productos/mostrarPrecio.vue";
import TListar from "../tienda/generales/t-listar.vue";
import BusquedaTextField from "../busqueda/busquedaTextField.vue";
export default {
    components: { BusquedaTextField, TListar, MostrarPrecio },
    props: {
        value: {
            type: Array,
            default: () => [],
        },
        colores: {
            type: Array,
            default: () => [],
        },
    },
    data: () => ({
        isLoading: false,

        seleccionado: -1,
        ajustes: {
            id: "idprecio",
            ruta: "/presentaciones",
            buscar: "",
        },
    }),
    methods: {
        agregarProducto(ix = -1) {
            if (ix >= 0) {
                this.seleccionado = ix;
            }
            if (this.seleccionado < 0) {
                return;
            }
            let i = this.$refs.tabla.data[this.seleccionado];
            let item = JSON.parse(JSON.stringify(i));
            item.carrito = 1;
            let index = this.carrito.findIndex((e) => e.idprecio == i.idprecio);
            if (index < 0) {
                this.carrito.push(item);
            } else {
                this.carrito[index].carrito++;
            }
        },
        restarProducto(ix = -1) {
            if (ix >= 0) {
                this.seleccionado = ix;
            }
            if (this.seleccionado < 0) {
                return;
            }
            let i = this.$refs.tabla.data[this.seleccionado];
            let item = JSON.parse(JSON.stringify(i));
            item.carrito = 1;
            let index = this.carrito.findIndex((e) => e.idprecio == i.idprecio);
            if (index >= 0) {
                if (this.carrito[index].carrito > 1) {
                    this.carrito[index].carrito--;
                } else {
                    this.carrito.splice(index, 1);
                }
            }
        },
        presentacionArriba() {
            if (this.seleccionado == 0) {
                this.seleccionado = this.$refs.tabla.data.length - 1;
            } else {
                this.seleccionado--;
            }
            this.movimiento();
        },
        presentacionAbajo() {
            if (this.seleccionado == this.$refs.tabla.data.length - 1) {
                this.seleccionado = 0;
            } else {
                this.seleccionado++;
            }
            this.movimiento();
        },
        movimiento() {
            let panel = this.$refs.panel.clientHeight;
            let card =
                this.$refs["pre" + this.seleccionado].$parent.$parent.$parent
                    .$el.offsetTop +
                this.$refs["pre" + this.seleccionado].$parent.$parent.$parent
                    .$el.clientHeight;
            let faltante = card - panel;
            if (faltante > 0) {
                this.$refs.panel.scrollTop = faltante;
            } else {
                this.$refs.panel.scrollTop = 0;
            }
        },
    },
    computed: {
        extraQuery() {
            return "";
        },
        carrito: {
            get() {
                return this.value;
            },
            set(n) {
                this.$emit("input", n);
            },
        },
        search() {
            return this.$route.query["v_search"];
        },
        height() {
            return this.$vuetify.breakpoint.xsOnly ? "320px" : "250px";
        },
    },
    watch: {
        search() {
            this.seleccionado = -1;
        },
    },
};
</script>

<style>
.selected-card {
    border: 2px solid var(--v-primary-base) !important;
}
.unselected-card {
    border: 2px solid var(--v-secondary-lighten3) !important;
}
</style>
