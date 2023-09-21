<template>
    <div>
        <v-row dense no-gutters>
            <v-col cols="12" md="9">
                <v-card tile elevation="0" v-if="false">
                    <v-card-text>
                        <v-list-item>
                            <v-list-item-subtitle class="align-right text-h6">
                                Cliente [CTRL+C]:
                            </v-list-item-subtitle>
                            <v-list-item-title class="align-right">
                                <div class="text-subtitle-1">C/F</div>
                            </v-list-item-title>
                        </v-list-item>
                    </v-card-text>
                </v-card>
                <buscar-para-vender
                    @producto="agregarProducto"
                    @suma="sumar($event)"
                    @multi="multi($event)"
                ></buscar-para-vender>
                <v-card tile elevation="0">
                    <v-card-text>
                        <v-card outlined tile>
                            <v-card-text>
                                <v-row dense no-gutters>
                                    <v-col cols="12" md="3">
                                        Producto <br />
                                        Codigo
                                    </v-col>
                                    <v-col cols="12" md="3" class="text-center">
                                        Cantidad
                                    </v-col>
                                    <v-col cols="12" md="3" class="text-right">
                                        Precio <br />
                                        Presentación
                                    </v-col>

                                    <v-col cols="12" md="3" class="text-right">
                                        Total
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                        <div
                            v-for="(item, index) in carrito"
                            :key="'car' + index"
                        >
                            <v-card elevation="0" tile>
                                <v-card-text class="text-h6 py-1">
                                    <v-row dense>
                                        <v-col cols="12" md="4">
                                            {{ item.nombre }} <br />
                                            <span class="text-subtitle-1">{{
                                                item.codigo
                                            }}</span>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            md="2"
                                            class="text-center"
                                        >
                                            <v-text-field
                                                type="number"
                                                class="center-input"
                                                solo
                                                v-model="item.cantidad"
                                                prepend-inner-icon="mdi-minus"
                                                append-icon="mdi-plus"
                                                style="align-text: center"
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
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            md="3"
                                            class="text-right"
                                        >
                                            Q {{ item.precio }}<br />
                                            <span class="text-subtitle-1"
                                                >Unidad</span
                                            >
                                        </v-col>

                                        <v-col
                                            cols="12"
                                            md="3"
                                            class="text-right"
                                        >
                                            Q {{ item.cantidad * item.precio }}
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                            <v-card
                                elevation="0"
                                tile
                                v-for="(descuento, i) in item.descuentos"
                                :key="'desc' + i"
                            >
                                <v-card-text class="text-h6 py-1 pl-4">
                                    <v-row dense>
                                        <v-col cols="12" md="9">
                                            <span class="text-subtitle-1">
                                                <strong
                                                    >*desq
                                                    {{ descuento.texto }} |
                                                    Descuento de
                                                </strong>
                                                -Q{{ descuento.descuento }}

                                                <span
                                                    v-if="
                                                        descuento.limite == 0 ||
                                                        descuento.cantidad <
                                                            descuento.limite
                                                    "
                                                    >por cada
                                                    {{ descuento.unidades }}
                                                    unidades</span
                                                >
                                                <span v-else
                                                    >por
                                                    {{ descuento.unidades }}
                                                    unidades | limite
                                                    {{ descuento.limite }} por
                                                    persona
                                                </span>
                                            </span>
                                        </v-col>

                                        <v-col
                                            cols="12"
                                            md="3"
                                            class="text-right"
                                        >
                                            - Q
                                            {{
                                                parseFloat(
                                                    descuento.descuento
                                                ) *
                                                parseFloat(descuento.cantidad)
                                            }}
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                            <v-divider class="primary"></v-divider>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="3" height="100%">
                <v-card tile class="pb-2">
                    <v-list>
                        <v-list-item>
                            <v-list-item-subtitle class="text-h6">
                                Articulos
                            </v-list-item-subtitle>
                            <v-list-item-title
                                class="text-right text-h6 grey--text pr-3"
                            >
                                {{ venta.articulos }}
                            </v-list-item-title>
                        </v-list-item>
                        <v-divider inset></v-divider>
                        <v-list-item>
                            <v-list-item-subtitle class="text-h6">
                                Subtotal
                            </v-list-item-subtitle>
                            <v-list-item-title
                                class="text-right text-h6 grey--text pr-3"
                            >
                                Q {{ venta.subtotal }}
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-subtitle class="text-h6">
                                Descuento Ofertas
                            </v-list-item-subtitle>
                            <v-list-item-title
                                class="text-right text-h6 grey--text pr-3"
                            >
                                Q {{ venta.ofertas }}
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-subtitle class="text-h6">
                                Descuento Manual
                            </v-list-item-subtitle>
                            <v-list-item-title
                                class="text-right text-h6 grey--text pr-3"
                            >
                                Q {{ venta.descuento }}
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item v-if="false">
                            <v-list-item-subtitle class="text-h6">
                                Descuento
                            </v-list-item-subtitle>
                            <v-list-item-title class="text-right">
                                <v-text-field
                                    v-model="venta.descuento"
                                    outlined
                                    min="0"
                                    type="number"
                                    prefix="Q"
                                    placeholder="##.##"
                                    class="text-h6 elevation-0 grey--text right-input"
                                ></v-text-field>
                            </v-list-item-title>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item>
                            <v-list-item-subtitle class="align-right text-h6">
                                TOTAL
                            </v-list-item-subtitle>
                            <v-list-item-title class="text-right">
                                <div class="d-flex flex-column">
                                    <div>
                                        <span class="text-h4">Q</span>
                                        <span
                                            class="green--text text--darken-2 text-h2"
                                        >
                                            {{ venta.total }}
                                        </span>
                                    </div>
                                </div>
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
                    <div class="mx-4 mb-2">
                        <v-btn
                            elevation="0"
                            depressed
                            block
                            large
                            color="primary"
                            class="white--text mb-2"
                            :disabled="carrito.length == 0"
                            @click="finalizar()"
                        >
                            Procesar Venta [CTRL + Enter]
                        </v-btn>
                    </div>
                </v-card>
            </v-col>
        </v-row>
        <v-dialog v-model="isEnded" max-width="400">
            <v-card>
                <v-card-title> Finalizar Venta </v-card-title>
                <v-card-text>
                    <v-list>
                        <v-list-item>
                            <v-list-item-subtitle class="text-h6">
                                Articulos
                            </v-list-item-subtitle>
                            <v-list-item-title
                                class="text-right text-h6 grey--text pr-3"
                            >
                                {{ venta.articulos }}
                            </v-list-item-title>
                        </v-list-item>
                        <v-divider inset></v-divider>
                        <v-list-item>
                            <v-list-item-subtitle class="text-h6">
                                Subtotal
                            </v-list-item-subtitle>
                            <v-list-item-title
                                class="text-right text-h6 grey--text pr-3"
                            >
                                Q {{ venta.subtotal }}
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-subtitle class="text-h6">
                                Descuento Ofertas
                            </v-list-item-subtitle>
                            <v-list-item-title
                                class="text-right text-h6 grey--text pr-3"
                            >
                                Q {{ venta.ofertas }}
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-subtitle class="text-h6">
                                Descuento Manual
                            </v-list-item-subtitle>
                            <v-list-item-title
                                class="text-right text-h6 grey--text pr-3"
                            >
                                Q {{ venta.descuento }}
                            </v-list-item-title>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item>
                            <v-list-item-subtitle class="align-right text-h6">
                                TOTAL
                            </v-list-item-subtitle>
                            <v-list-item-title class="text-right">
                                <div class="d-flex flex-column">
                                    <div>
                                        <span class="text-h4">Q</span>
                                        <span
                                            class="green--text text--darken-2 text-h2"
                                        >
                                            {{ venta.total }}
                                        </span>
                                    </div>
                                </div>
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item class="pt-2">
                            <v-list-item-subtitle class="text-h6">
                                Efectivo
                            </v-list-item-subtitle>
                            <v-list-item-title class="text-right">
                                <v-text-field
                                    v-model="venta.efectivo"
                                    ref="efectivo"
                                    outlined
                                    min="0"
                                    type="number"
                                    prefix="Q"
                                    placeholder="##.##"
                                    class="text-h6 elevation-0 grey--text right-input"
                                ></v-text-field>
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-subtitle class="text-h6">
                                Cambio
                            </v-list-item-subtitle>
                            <v-list-item-title
                                class="text-right text-h6 grey--text pr-3"
                            >
                                Q {{ venta.cambio }}
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
                    <v-btn
                        block
                        large
                        color="green"
                        class="white--text"
                        :loading="isProcesed"
                        @click="procesar()"
                    >
                        Finalizar y Cobrar [CTRl + Enter]
                    </v-btn>
                </v-card-text>
            </v-card>
        </v-dialog>
        <div v-shortkey="['ctrl', 'enter']" @shortkey="atajoFinalizar()"></div>
    </div>
</template>

<script>
import BuscarParaVender from "../../../components/tienda/productos/buscarParaVender.vue";

import ProductosPrecios from "../../../components/tienda/productos/productosPrecios.vue";
import VNiceModal from "../../../components/tienda/generales/v-nice-modal.vue";
export default {
    components: { VNiceModal, ProductosPrecios, BuscarParaVender },
    mounted() {},
    data: () => ({
        isLoading: false,
        isEnded: false,
        isProcesed: false,
        saved: false,
        carrito: [],
        venta: {
            cliente: 0,
            costo: 0,
            ganancia: 0,
            subtotal: 0,
            ofertas: 0,
            descuento: 0,
            total: 0,
            efectivo: 0,
            cambio: 0,
        },
        error: {
            status: false,
            msg: "",
        },
    }),
    methods: {
        agregarProducto(e) {
            let codCarrito = e.carrito;

            let index = this.carrito.findIndex((e) => e.carrito == codCarrito);

            if (index >= 0) {
                this.carrito[index].cantidad =
                    parseFloat(this.carrito[index].cantidad) + 1;
            } else {
                this.carrito.unshift(e);
            }
            index = this.carrito.findIndex((e) => e.carrito == codCarrito);
            this.aplicarDescuento(index);
        },
        suma(cantidad) {
            if (this.carrito.length > 0) {
                this.carrito[0].cantidad += cantidad;
                this.aplicarDescuento(0);
            }
        },
        multi(cantidad) {
            if (this.carrito.length > 0) {
                this.carrito[0].cantidad = cantidad;
                this.aplicarDescuento(0);
            }
        },
        sumarCantidad(index) {
            this.carrito[index].cantidad = this.carrito[index].cantidad + 1;
            this.aplicarDescuento(index);
        },
        restarCantidad(index) {
            this.carrito[index].cantidad =
                this.carrito[index].cantidad - 1 < 0
                    ? 0
                    : this.carrito[index].cantidad - 1;
            this.aplicarDescuento(index);
        },
        aplicarDescuento(index) {
            let producto = JSON.parse(JSON.stringify(this.carrito[index]));

            let precios = producto.producto.precios;
            producto.descuentos = [];

            let fecha_estado = false;
            let limite = -1;
            let cantidad_inicial = producto.cantidad;
            let precio_inicial = producto.cantidad * producto.precio;
            precios.forEach((p) => {
                fecha_estado =
                    this.$moment(this.$moment().format("Y-M-D")).isSameOrBefore(
                        this.$moment(p.fecha).format("Y-M-D")
                    ) || !p.fecha;

                if (fecha_estado) {
                    let aplica = Math.floor(cantidad_inicial / p.cantidad);
                    //console.table(cantidad_inicial, p.cantidad);
                    if (aplica >= 1) {
                        if (aplica > p.limite && limite > 0) {
                            aplica = p.limite;
                        }

                        let descuento = p.cantidad * producto.precio - p.precio;
                        let restantes = cantidad_inicial - aplica * p.cantidad;
                        let info = {
                            texto: p.nombre,
                            descuento: descuento,
                            cantidad: aplica,
                            unidades: p.cantidad,
                            limite: p.limite,
                        };
                        console.log(info);
                        producto.descuentos.push(info);

                        cantidad_inicial = restantes;
                    }
                }

                //console.log(fecha_vencimiento);
            });
            this.carrito[index].descuentos = producto.descuentos;
        },
        atajoFinalizar() {
            if (!this.isEnded) {
                this.finalizar();
            } else {
                this.procesar();
            }
        },
        finalizar() {
            if (this.carrito.length == 0) {
                return;
            }
            this.isEnded = true;
            setTimeout(() => {
                this.$refs.efectivo.$refs.input.select();
                this.$refs.efectivo.$refs.input.focus();
            }, 50);
        },

        calcularTotales() {
            this.venta.articulos = 0;
            this.venta.subtotal = 0;
            this.venta.ofertas = 0;
            this.venta.total = 0;
            this.venta.costo = 0;

            this.carrito.forEach((e) => {
                this.venta.articulos += e.cantidad;
                this.venta.subtotal += e.cantidad * e.precio;

                this.venta.costo +=
                    e.cantidad * parseFloat(e.producto.costo).toFixed(2);
                e.descuentos.forEach((d) => {
                    this.venta.ofertas =
                        this.venta.ofertas + d.descuento * d.cantidad;
                });
            });
            this.venta.total =
                this.venta.subtotal -
                (this.venta.ofertas || 0) +
                (this.venta.descuento || 0);

            this.venta.ganancia = this.total - this.venta.costo;
        },
        async procesar() {
            this.isProcesed = true;
            await this.$axios
                .post("/ventas/vender", {
                    venta: this.venta,
                    carrito: this.carrito,
                })
                .then((result) => {
                    this.recibo(result.data.documento);
                })
                .catch((err) => {
                    console.log("error");
                });
            this.isProcesed = false;
        },
        async recibo(id) {
            this.isProcesed = true;
            await this.$axios
                .post("/impresiones/recibos/" + id)
                .then((result) => {
                    this.limpiar();
                })
                .catch((err) => {
                    console.log("error");
                });
            this.isProcesed = false;
        },
        limpiar() {
            this.carrito = [];
            this.venta.efectivo = 0;
            this.venta.cambio = 0;
            this.isEnded = false;
            this.isProcesed = false;
            this.calcularTotales();
        },
    },

    computed: {
        descuento() {
            return this.venta.descuento;
        },
        efectivo() {
            return this.venta.efectivo;
        },
    },
    watch: {
        carrito: {
            deep: true,
            handler() {
                this.calcularTotales();
            },
        },
        descuento() {
            this.calcularTotales();
        },
        efectivo() {
            this.venta.cambio =
                this.venta.efectivo - this.venta.total < 0
                    ? 0
                    : this.venta.efectivo - this.venta.total;
        },
    },
};
</script>

<style scoped>
.right-input >>> input {
    text-align: right;
}
.center-input >>> input {
    text-align: center;
}
</style>
