<template>
    <div>
        <v-row dense no-gutters>
            <v-col cols="12" md="8">
                <v-card tile elevation="0">
                    <v-card-title> Productos </v-card-title>
                    <v-card-subtitle>
                        <div class="ml-1">
                            <span class="caption">Seleccionar</span>

                            <v-chip
                                label
                                color="grey--text"
                                class="ml-1 v-chip--active"
                            >
                                <v-icon>mdi-arrow-down-bold-box-outline</v-icon>
                            </v-chip>

                            <v-chip
                                label
                                color="grey--text"
                                class="ml-1 v-chip--active"
                            >
                                <v-icon>mdi-arrow-up-bold-box-outline</v-icon>
                            </v-chip>
                        </div>
                    </v-card-subtitle>
                    <v-card-text class="px-0">
                        <v-simple-table>
                            <template v-slot:default>
                                <thead>
                                    <tr>
                                        <th class="text-left">Nombres</th>
                                        <th class="text-left">Presentacion</th>
                                        <th class="text-left">Precio</th>
                                        <th class="text-left">Cantidad</th>
                                        <th class="text-left">Descuento</th>
                                        <th class="text-left">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="(item, index) in productos"
                                        :key="'cart' + index"
                                        class="cursor-pointer"
                                        :class="
                                            selected == index
                                                ? 'teal lighten-4 rounded-lg'
                                                : ''
                                        "
                                        @click="selected = index"
                                    >
                                        <td>
                                            <strong>
                                                {{ item.nombre }}
                                                {{ item.marca }}
                                                {{ item.dimension }}
                                            </strong>
                                            <br />
                                            <span class="caption">{{
                                                item.codigo
                                            }}</span>
                                        </td>
                                        <td>
                                            {{ item.presentacion }}
                                        </td>

                                        <td>Q{{ item.precio }}</td>
                                        <td>
                                            <div style="max-width: 150px">
                                                <v-text-field
                                                    type="number"
                                                    class="center-input my-1"
                                                    outlined
                                                    v-model="item.cantidad"
                                                    prepend-inner-icon="mdi-minus"
                                                    append-icon="mdi-plus"
                                                    style="align-text: center"
                                                    dense
                                                    @click:append="
                                                        sumarCantidad(index)
                                                    "
                                                    @click:prepend-inner="
                                                        restarCantidad(index)
                                                    "
                                                    readonly
                                                    hide-details=""
                                                >
                                                </v-text-field>
                                            </div>
                                        </td>
                                        <td>Q00.00</td>
                                        <td>
                                            Q{{
                                                (
                                                    parseFloat(item.precio) *
                                                    item.cantidad
                                                ).toFixed(2)
                                            }}
                                        </td>
                                    </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="12" md="4">
                <v-card tile elevation="0" outlined>
                    <v-card-title> Presentaciones </v-card-title>
                    <v-card-subtitle>
                        <div class="ml-1">
                            <span class="caption">Seleccionar</span>

                            <v-chip
                                label
                                color="grey--text"
                                class="ml-1 v-chip--active"
                            >
                                [CTRL +
                                <v-icon>mdi-arrow-down-bold-box-outline</v-icon
                                >]
                            </v-chip>

                            <v-chip
                                label
                                color="grey--text"
                                class="ml-1 v-chip--active"
                            >
                                [CTRL +
                                <v-icon>mdi-arrow-up-bold-box-outline</v-icon>]
                            </v-chip>
                        </div>
                    </v-card-subtitle>
                    <v-card-text class="px-0">
                        <v-simple-table>
                            <template v-slot:default>
                                <thead>
                                    <tr>
                                        <th class="text-left">Nombre</th>
                                        <th class="text-center">Unidades</th>
                                        <th class="text-right">Precio</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="(item, index) in presentaciones"
                                        :key="'cartp' + index"
                                        :class="{
                                            'grey lighten-3 rounded-lg':
                                                presentacion == index,
                                            'teal lighten-5 rounded-lg':
                                                productos[selected]
                                                    .presentacionIndex == index,
                                        }"
                                    >
                                        <td>
                                            <strong>
                                                {{ item.nombre }}
                                            </strong>
                                        </td>
                                        <td class="text-center">
                                            {{ item.cantidad }}
                                        </td>

                                        <td class="text-right">
                                            Q{{ item.precio }}
                                        </td>
                                    </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <div v-shortkey="['pagedown']" @shortkey="asignarPresentacion"></div>
        <div v-shortkey="['arrowup']" @shortkey="seleccionarArriba"></div>
        <div v-shortkey="['arrowdown']" @shortkey="seleccionarAbajo"></div>
        <div
            v-shortkey="['arrowright']"
            @shortkey="sumarCantidad(selected)"
        ></div>
        <div
            v-shortkey="['arrowleft']"
            @shortkey="restarCantidad(selected)"
        ></div>

        <div
            v-shortkey="['ctrl', 'arrowup']"
            @shortkey="presentacionArriba"
        ></div>
        <div
            v-shortkey="['ctrl', 'arrowdown']"
            @shortkey="presentacionAbajo"
        ></div>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: Array,
            default: () => [],
        },
    },
    data: () => ({
        selected: 0,
        presentacion: 0,
        presentaciones: [],
    }),
    methods: {
        asignarPresentacion() {
            let precio =
                this.productos[this.selected].precios[this.presentacion];

            this.productos[this.selected].costo = precio.costo;
            this.productos[this.selected].precio = precio.precio;
            this.productos[this.selected].presentacion = precio.nombre;

            this.productos[this.selected].presentacionIndex = this.presentacion;

            //this.precios[this.selected].presentacionIndex = this.presentacion;
        },
        presentacionArriba() {
            if (this.presentacion == 0) {
                this.presentacion = this.presentaciones.length - 1;
            } else {
                this.presentacion--;
            }
        },
        presentacionAbajo() {
            if (this.presentacion == this.presentaciones.length - 1) {
                this.presentacion = 0;
            } else {
                this.presentacion++;
            }
        },
        seleccionarArriba() {
            if (this.selected == 0) {
                this.selected = this.productos.length - 1;
            } else {
                this.selected--;
            }
            this.presentacion = this.productos[this.selected].presentacionIndex;
        },
        seleccionarAbajo() {
            if (this.selected == this.productos.length - 1) {
                this.selected = 0;
            } else {
                this.selected++;
            }
            this.presentacion = this.productos[this.selected].presentacionIndex;
        },
        sumarCantidad(index) {
            this.productos[index].cantidad =
                parseFloat(this.productos[index].cantidad) + 1;
            //this.aplicarDescuento(index);
        },
        restarCantidad(index) {
            this.productos[index].cantidad =
                this.productos[index].cantidad - 1 < 0
                    ? 0
                    : parseFloat(this.productos[index].cantidad) - 1;
            //this.aplicarDescuento(index);
        },
    },
    computed: {
        productos: {
            get() {
                return this.value;
            },
            set(n) {
                this.$emit("input", n);
            },
        },
    },
    watch: {
        productos() {
            if (this.productos) {
                this.presentaciones = this.productos[this.selected].precios;
            }
        },
        selected() {
            if (this.productos) {
                this.presentaciones = this.productos[this.selected].precios;
            }
        },
    },
};
</script>

<style></style>
