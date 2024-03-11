<template>
    <div>
        <v-navigation-drawer permanent app right width="500">
            <template v-slot:prepend>
                <v-card tile>
                    <v-card-text>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-subtitle>
                                    C/F
                                </v-list-item-subtitle>
                                <v-list-item-title class="text-h6">
                                    Cliente Final
                                </v-list-item-title>
                                <v-list-item-subtitle>
                                    {{ venta.articulos }} Productos
                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-card-text>
                </v-card>
                <v-divider></v-divider>
            </template>
            <template v-slot:default ref="content">
                <div
                    v-if="carrito.length == 0"
                    class="d-flex justify-center align-center flex-column"
                    style="height: 250px"
                >
                    <v-icon size="100" class="grey--text">
                        mdi-cart-variant
                    </v-icon>
                    <br />
                    <span> Agregar productos al carrito </span>
                </div>
                <venta-carrito
                    ref="carrito"
                    @update="actualizar()"
                    :colores="colores"
                    v-model="carrito"
                ></venta-carrito>
            </template>

            <template v-slot:append>
                <v-card class="mx-2 rounded-lg mb-2" elevation="2">
                    <v-list dense color="transparent">
                        <v-list-item>
                            <v-list-item-subtitle class="">
                                Subtotal
                            </v-list-item-subtitle>
                            <v-list-item-title class="text-right">
                                <mostrar-precio
                                    v-model="venta.subtotal"
                                ></mostrar-precio>
                            </v-list-item-title>
                        </v-list-item>

                        <v-list-item @click="isDiscount = true">
                            <v-list-item-subtitle class="">
                                Descuentos
                            </v-list-item-subtitle>
                            <v-list-item-title class="text-right">
                                <mostrar-precio
                                    v-model="venta.descuento"
                                ></mostrar-precio>
                            </v-list-item-title>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item>
                            <v-list-item-subtitle class="align-right">
                                <span class="font-weight-black"> TOTAL </span>
                            </v-list-item-subtitle>
                            <v-list-item-title class="text-right">
                                <mostrar-precio v-model="venta.total">
                                    <template v-slot:moneda>
                                        <span
                                            class="text-h5 font-weight-bold teal--text"
                                        >
                                            Q
                                        </span>
                                    </template>
                                    <template v-slot:entero="{ entero }">
                                        <span
                                            class="text-h4 font-weight-bold teal--text"
                                        >
                                            {{ entero }}.
                                        </span>
                                    </template>
                                    <template v-slot:decimal="{ decimal }">
                                        <span
                                            class="text-h5 font-weight-bold teal--text"
                                        >
                                            {{ decimal }}
                                        </span>
                                    </template>
                                </mostrar-precio>
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-card>

                <div class="pa-2 pt-1 text-center">
                    <v-btn
                        class="buy-button"
                        dark
                        block
                        color="teal"
                        href="https://store.vuetifyjs.com/products/lux-admin-pro/"
                        target="_blank"
                    >
                        Procesar Venta
                    </v-btn>
                </div>
            </template>
        </v-navigation-drawer>

        <v-container>
            <v-row dense>
                <v-col cols="12" md="12">
                    <v-card outlined class="rounded-lg">
                        <v-card-title> Resultados de Busqueda </v-card-title>

                        <v-card-text class="pb-0">
                            <venta-busqueda
                                :colores="colores"
                                v-model="carrito"
                            ></venta-busqueda>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
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
                        text
                        :loading="isProcesed"
                        @click="procesar()"
                    >
                        Finalizar e Imprimir
                    </v-btn>
                    <v-btn
                        block
                        large
                        color="green"
                        class="white--text"
                        :loading="isProcesed"
                        @click="atajoFinalizar()"
                    >
                        Finalizar y Cobrar [CTRl + Enter]
                    </v-btn>
                </v-card-text>
            </v-card>
        </v-dialog>
        <div v-shortkey="['ctrl', 'enter']" @shortkey="atajoFinalizar()"></div>
        <div v-shortkey="['ctrl', 'm']" @shortkey="descuentoManual()"></div>
        <v-dialog v-model="isDiscount" max-width="350">
            <v-card>
                <v-card-title> Descuento </v-card-title>
                <v-card-text>
                    <p>Ingresa el descuento en quetzales</p>
                    <v-text-field
                        type="number"
                        ref="descm"
                        outlined
                        label="Descuento"
                        v-model="venta.descuento"
                    ></v-text-field>
                    <v-divider></v-divider>
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
                        <v-list-item @click="isDiscount = true">
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
                </v-card-text>
                <v-card-text @click="isDiscount = false">
                    <v-btn text block> Cerrar </v-btn>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-bottom-navigation app v-if="false">
            <v-btn
                large
                color="primary"
                tile
                dark
                style="white--text"
                @click="finalizar()"
            >
                <span class="white--text"> PROCESAR VENTA </span>
                <span class="white--text"><strong>[CTRL+ENTER]</strong></span>
            </v-btn>
        </v-bottom-navigation>
    </div>
</template>

<script>
import VentaCarrito from "../../../components/venta/ventaCarrito.vue";
import VentaBusqueda from "../../../components/venta/ventaBusqueda.vue";
import MostrarPrecio from "../../../components/productos/mostrarPrecio.vue";
import VentaListaVenta from "../../../components/tienda/venta/ventaListaVenta.vue";
import BuscarParaVender from "../../../components/tienda/productos/buscarParaVender.vue";

import ProductosPrecios from "../../../components/tienda/productos/productosPrecios.vue";
import VNiceModal from "../../../components/tienda/generales/v-nice-modal.vue";
export default {
    components: {
        VNiceModal,
        ProductosPrecios,
        BuscarParaVender,
        VentaListaVenta,
        MostrarPrecio,
        VentaBusqueda,
        VentaCarrito,
    },
    mounted() {},
    data: () => ({
        isLoading: false,
        isEnded: false,
        isProcesed: false,
        saved: false,
        isDiscount: false,
        colores: ["purple", "orange", "teal", "pink", "cyan"],
        carrito: [],
        venta: {
            articulos: 0,
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
        descuentoManual() {
            this.isDiscount = !this.isDiscount;
            setTimeout(() => {
                this.$refs.descm.$refs.input.select();
                this.$refs.descm.$refs.input.focus();
            }, 50);
        },
        actualizar() {
            this.calcularTotales();
        },
        aplicarDescuento(index) {
            return;
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
                        producto.descuentos.push(info);
                        cantidad_inicial = restantes;
                    }
                }
            });
            this.carrito[index].descuentos = producto.descuentos;
        },
        atajoFinalizar() {
            if (!this.isEnded) {
                this.finalizar();
            } else {
                this.finalizarImprimir();
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
                this.venta.articulos =
                    this.venta.articulos + parseInt(e.carrito);
                this.venta.subtotal +=
                    parseInt(e.carrito) * parseFloat(e.precio);
                this.venta.costo +=
                    parseInt(e.cantidad) *
                    parseFloat(e.producto.costo).toFixed(2);
            });

            this.venta.total =
                this.venta.subtotal -
                ((parseFloat(this.venta.ofertas) || 0) +
                    (parseFloat(this.venta.descuento) || 0));

            //this.venta.ganancia = this.total - this.venta.costo;
            let content = document.getElementsByClassName(
                "v-navigation-drawer__content"
            );

            this.$nextTick(() => {
                content[0].scrollTop = content[0].scrollHeight;
            });
        },
        async finalizarImprimir() {
            this.isProcesed = true;
            await this.$axios
                .post("/ventas/vender", {
                    venta: this.venta,
                    carrito: this.carrito,
                })
                .then((result) => {
                    this.$axios.get("/impresiones/recibos/abrir").then((e) => {
                        this.limpiar();
                    });
                })
                .catch((err) => {
                    console.log("error");
                });

            this.isProcesed = false;
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
</style>
