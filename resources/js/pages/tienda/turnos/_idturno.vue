<template>
    <div>
        <v-container>
            <v-progress-circular
                indeterminate
                v-if="isLoading"
            ></v-progress-circular>
            <v-row dense v-else>
                <v-col cols="12" sm="12" md="4">
                    <v-card
                        class="rounded-lg mb-2"
                        elevation="0"
                        color="surface"
                        dark
                    >
                        <v-card-title> Productos Vendidos </v-card-title>
                        <v-card-subtitle>
                            Cantidad de unidades vendidas por cada producto
                        </v-card-subtitle>
                        <v-card-text>
                            <grafica-pie
                                :dark="true"
                                :labels="grafica.labels"
                                :series="grafica.series"
                            ></grafica-pie>
                        </v-card-text>
                    </v-card>
                    <v-card class="rounded-lg" elevation="0">
                        <v-card-title> Turno </v-card-title>
                        <v-card-subtitle> Detalles del Turno </v-card-subtitle>
                        <v-card-text class="px-0">
                            <v-list dense color="transparent">
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-subtitle>
                                            Caja
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                    <v-list-item-content>
                                        <v-list-item-title class="text-right">
                                            {{ turno.caja.nombre || "" }}
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-subtitle>
                                            Usuario que Inicio:
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                    <v-list-item-content>
                                        <v-list-item-title class="text-right">
                                            {{ turno.nombre }}
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-subtitle>
                                            Fecha de Apertura
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                    <v-list-item-content>
                                        <v-list-item-title class="text-right">
                                            {{
                                                moment(turno.apertura).format(
                                                    "DD/MM/Y hh:mm a"
                                                )
                                            }}
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-subtitle>
                                            Fecha de Cierre
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                    <v-list-item-content>
                                        <v-list-item-title class="text-right">
                                            <span
                                                class="accent--text"
                                                v-if="!turno.cierre"
                                            >
                                                No ha cerrado turno
                                            </span>
                                            <span v-else>
                                                {{
                                                    moment(turno.cierre).format(
                                                        "DD/MM/Y hh:mm a"
                                                    )
                                                }}
                                            </span>
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                            <div class="px-2">
                                <v-btn color="accent" block>
                                    <v-icon left>mdi-cash-lock</v-icon>
                                    Cerrar Turno
                                </v-btn>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" sm="12" md="8">
                    <v-row dense>
                        <v-col cols="12"
                            ><v-row dense>
                                <v-col cols="12" sm="4">
                                    <v-card
                                        class="rounded-lg"
                                        elevation="0"
                                        width="100%"
                                        height="100%"
                                    >
                                        <v-card-subtitle>
                                            <strong>Apertura de Caja</strong>
                                        </v-card-subtitle>
                                        <v-card-text class="text-right">
                                            <mostrar-precio
                                                :size="30"
                                                :value="turno.monto"
                                            ></mostrar-precio>
                                        </v-card-text>
                                        <v-card-text class="pt-0">
                                            Monto de inicio de turno
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                                <v-col cols="12" sm="4">
                                    <v-card
                                        class="rounded-lg"
                                        elevation="0"
                                        width="100%"
                                        height="100%"
                                    >
                                        <v-card-subtitle>
                                            <strong>Subtotal</strong>
                                        </v-card-subtitle>
                                        <v-card-text>
                                            <mostrar-precio
                                                :size="30"
                                                :value="totales.subtotal || 0"
                                            ></mostrar-precio>
                                        </v-card-text>
                                        <v-card-text class="pt-0">
                                            Subtotal de ventas realizadas
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                                <v-col cols="12" sm="4">
                                    <v-card
                                        class="rounded-lg"
                                        elevation="0"
                                        width="100%"
                                        height="100%"
                                    >
                                        <v-card-subtitle>
                                            <strong>Descuentos</strong>
                                        </v-card-subtitle>
                                        <v-card-text>
                                            <mostrar-precio
                                                :size="30"
                                                :value="totales.descuento || 0"
                                            ></mostrar-precio>
                                        </v-card-text>
                                        <v-card-text class="pt-0">
                                            Suma de descuentos
                                        </v-card-text>
                                    </v-card>
                                </v-col>

                                <v-col cols="12" sm="6">
                                    <v-card
                                        class="rounded-lg"
                                        elevation="0"
                                        width="100%"
                                        height="100%"
                                        color="secondary"
                                        dark
                                    >
                                        <v-card-subtitle>
                                            <strong> Total de Ventas </strong>
                                        </v-card-subtitle>
                                        <v-card-text class="text-right">
                                            <mostrar-precio
                                                :size="30"
                                                :value="totales.total"
                                            ></mostrar-precio>
                                        </v-card-text>
                                        <v-card-text class="pt-0">
                                            Ventas - Descuentos
                                        </v-card-text>
                                    </v-card>
                                </v-col>

                                <v-col cols="12" sm="6">
                                    <v-card
                                        class="rounded-lg"
                                        elevation="0"
                                        width="100%"
                                        color="primary"
                                        dark
                                        height="100%"
                                    >
                                        <v-card-subtitle>
                                            <strong> Total en Caja </strong>
                                        </v-card-subtitle>
                                        <v-card-text>
                                            <mostrar-precio
                                                :size="30"
                                                :value="
                                                    parseFloat(totales.total) +
                                                        parseFloat(
                                                            turno.monto
                                                        ) || 0
                                                "
                                            ></mostrar-precio>
                                        </v-card-text>
                                        <v-card-text class="pt-0">
                                            Total + Apertura de Caja
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12">
                            <v-card outlined class="rounded-lg">
                                <v-card-title> Ventas del Turno </v-card-title>
                                <v-card-subtitle>
                                    Ventas realizadas durante el turno
                                </v-card-subtitle>
                                <v-card-text>
                                    <v-simple-table>
                                        <template v-slot:default>
                                            <thead>
                                                <tr>
                                                    <th class="text-left">#</th>
                                                    <th>Articulos</th>
                                                    <th class="text-left">
                                                        Fecha
                                                    </th>
                                                    <th>Hora</th>
                                                    <th>Cajero</th>
                                                    <th class="text-right">
                                                        Subtotal
                                                    </th>
                                                    <th class="text-right">
                                                        Descuento
                                                    </th>
                                                    <th class="text-right">
                                                        Total
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr
                                                    v-for="(venta, i) in ventas"
                                                >
                                                    <td>
                                                        {{ i + 1 }}
                                                    </td>
                                                    <td>
                                                        {{ venta.articulos }}
                                                    </td>
                                                    <td>
                                                        {{
                                                            moment(
                                                                venta.created_at
                                                            ).format("DD-MM")
                                                        }}
                                                    </td>
                                                    <td>
                                                        {{
                                                            moment(
                                                                venta.created_at
                                                            ).format("hh:mm a")
                                                        }}
                                                    </td>
                                                    <td>
                                                        {{
                                                            venta.cajero_nombre
                                                        }}
                                                    </td>
                                                    <td>
                                                        <mostrar-precio
                                                            :size="12"
                                                            v-model="
                                                                venta.subtotal
                                                            "
                                                        ></mostrar-precio>
                                                    </td>
                                                    <td>
                                                        <mostrar-precio
                                                            :size="12"
                                                            v-model="
                                                                venta.descuento
                                                            "
                                                        ></mostrar-precio>
                                                    </td>
                                                    <td>
                                                        <mostrar-precio
                                                            :size="12"
                                                            v-model="
                                                                venta.total
                                                            "
                                                        ></mostrar-precio>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </template>
                                    </v-simple-table>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import GraficaPie from "../../../components/graficas/grafica-pie.vue";

import moment from "moment";
import MostrarPrecio from "../../../components/productos/mostrarPrecio.vue";

export default {
    components: { MostrarPrecio, GraficaPie },
    mounted() {
        this.init();
    },
    data: () => ({
        isLoading: false,
        turno: {},
        ventas: [],
        totales: {
            articulos: 0,
            subtotal: 0,
            descuento: 0,
            total: 0,
        },
        grafica: {
            labels: [],
            series: [],
        },
        moment,
    }),
    methods: {
        async init() {
            this.isLoading = true;
            await this.$axios
                .get("/turnos/" + this.idturno)
                .then((result) => {
                    this.grafica.labels = result.data.grafica.etiquetas;
                    this.grafica.series = result.data.grafica.serie;

                    this.totales = result.data.totales;
                    this.turno = result.data.turno;
                    this.ventas = this.turno.ventas;
                    delete this.turno.ventas;
                })
                .catch((err) => {
                    console.log(err);
                });
            this.isLoading = false;
        },
    },
    computed: {
        idturno() {
            return this.$route.params.idturno;
        },
    },
};
</script>

<style></style>
