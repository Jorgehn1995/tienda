<template>
    <div>
        <v-navigation-drawer
            v-model="drawer"
            :permanent="$vuetify.breakpoint.mdAndUp"
            app
            right
            :width="$vuetify.breakpoint.mdAndUp ? 500 : 400"
        >
            <template v-slot:prepend>
                <v-card tile>
                    <v-card-text>
                        <v-list-item>
                            <v-list-item-action
                                v-if="!$vuetify.breakpoint.mdAndUp"
                            >
                                <v-btn icon @click="drawer = !drawer">
                                    <v-icon>mdi-chevron-left</v-icon>
                                </v-btn>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-subtitle>
                                    {{ cajaNombre }}
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
                        @click="finalizar"
                        target="_blank"
                    >
                        Procesar Venta [CTRL + ENTER]
                    </v-btn>
                </div>
            </template>
        </v-navigation-drawer>
        <v-btn
            v-if="!$vuetify.breakpoint.mdAndUp"
            fab
            @click="drawer = !drawer"
            color="primary"
            fixed
            right
            bottom
            x-large
        >
            <v-icon>mdi-cart</v-icon>
        </v-btn>

        <v-container>
            <v-row dense>
                <v-col cols="12" md="12">
                    <v-card outlined class="rounded-lg">
                        <v-card-title> Resultados de Busqueda </v-card-title>

                        <v-card-text class="pb-0">
                            <venta-busqueda
                                ref="busqueda"
                                :colores="colores"
                                v-model="carrito"
                            ></venta-busqueda>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <v-dialog v-model="isEnded" max-width="400">
            <v-card class="rounded-lg">
                <v-card-title> Finalizar Venta </v-card-title>
                <v-card-text>
                    <v-list dense>
                        <v-list-item>
                            <v-list-item-subtitle>
                                Articulos
                            </v-list-item-subtitle>
                            <v-list-item-title class="text-right grey--text">
                                {{ venta.articulos }}
                            </v-list-item-title>
                        </v-list-item>
                        <v-divider inset></v-divider>
                        <v-list-item>
                            <v-list-item-subtitle>
                                Subtotal
                            </v-list-item-subtitle>
                            <v-list-item-title class="text-right grey--text">
                                <mostrar-precio
                                    v-model="venta.subtotal"
                                ></mostrar-precio>
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-subtitle>
                                Descuento Ofertas
                            </v-list-item-subtitle>
                            <v-list-item-title class="text-right grey--text">
                                <mostrar-precio
                                    v-model="venta.ofertas"
                                ></mostrar-precio>
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-subtitle>
                                Descuento Manual
                            </v-list-item-subtitle>
                            <v-list-item-title class="text-right grey--text">
                                <mostrar-precio
                                    v-model="venta.descuento"
                                ></mostrar-precio>
                            </v-list-item-title>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item>
                            <v-list-item-subtitle class="align-right text-h6">
                                TOTAL
                            </v-list-item-subtitle>
                            <v-list-item-title class="text-right">
                                <div class="d-flex flex-column">
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
                                    class="text-h6 elevation-0 grey--text right-input rounded-lg"
                                ></v-text-field>
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-subtitle class="text-h6">
                                Cambio
                            </v-list-item-subtitle>
                            <v-list-item-title
                                class="text-right text-h6 grey--text"
                            >
                                <mostrar-precio
                                    v-model="venta.cambio"
                                ></mostrar-precio>
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
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
        <v-dialog v-model="isDiscount" max-width="400">
            <v-card class="rounded-lg">
                <v-card-title> Descuento </v-card-title>
                <v-card-text>
                    <p>Ingresa el descuento en quetzales</p>
                    <v-text-field
                        class="rounded-lg"
                        type="number"
                        ref="descm"
                        outlined
                        label="Descuento"
                        v-model="venta.descuento"
                    ></v-text-field>
                    <v-divider></v-divider>
                    <v-list>
                        <v-list-item>
                            <v-list-item-subtitle>
                                Articulos
                            </v-list-item-subtitle>
                            <v-list-item-title class="text-right grey--text">
                                {{ venta.articulos }}
                            </v-list-item-title>
                        </v-list-item>
                        <v-divider inset></v-divider>
                        <v-list-item>
                            <v-list-item-subtitle>
                                Subtotal
                            </v-list-item-subtitle>
                            <v-list-item-title class="text-right grey--text">
                                <mostrar-precio
                                    v-model="venta.subtotal"
                                ></mostrar-precio>
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="isDiscount = true">
                            <v-list-item-subtitle>
                                Descuento Ofertas
                            </v-list-item-subtitle>
                            <v-list-item-title class="text-right grey--text">
                                <mostrar-precio
                                    v-model="venta.ofertas"
                                ></mostrar-precio>
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-subtitle>
                                Descuento Manual
                            </v-list-item-subtitle>
                            <v-list-item-title class="text-right grey--text">
                                <mostrar-precio
                                    v-model="venta.descuento"
                                ></mostrar-precio>
                            </v-list-item-title>
                        </v-list-item>

                        <v-divider></v-divider>
                        <v-list-item>
                            <v-list-item-subtitle class="align-right text-h6">
                                TOTAL
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
                </v-card-text>
                <v-card-text @click="isDiscount = false">
                    <v-btn text block> Cerrar </v-btn>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-dialog v-model="isDone" max-width="400">
            <v-card class="rounded-lg">
                <v-card-title> Venta Procesada </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    Su venta se ha procesado con exito
                    <br />
                    ¿Cómo desea proceder?
                </v-card-text>
                <v-card-actions>
                    <v-btn @click="nuevaVenta()" outlined> Nueva Venta </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" outlined>Generar Factura</v-btn>
                    <v-btn color="primary" dark>Generar Recibo</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <div v-shortkey="['ctrl', 'enter']" @shortkey="atajoFinalizar()"></div>
        <div v-shortkey="['ctrl', 'm']" @shortkey="descuentoManual()"></div>
    </div>
</template>

<script>
import VentaCarrito from "../../../../components/venta/ventaCarrito.vue";
import VentaBusqueda from "../../../../components/venta/ventaBusqueda.vue";
import MostrarPrecio from "../../../../components/productos/mostrarPrecio.vue";
import VentaListaVenta from "../../../../components/tienda/venta/ventaListaVenta.vue";
import BuscarParaVender from "../../../../components/tienda/productos/buscarParaVender.vue";

import ProductosPrecios from "../../../../components/tienda/productos/productosPrecios.vue";
import VNiceModal from "../../../../components/tienda/generales/v-nice-modal.vue";
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
    beforeMount() {
        if (this.$vuetify.breakpoint.smAndDown) {
            this.drawer = false;
        }
    },
    mounted() {
        let div = document.getElementsByClassName(
            "v-navigation-drawer__content"
        );
        this.verificarCaja();
    },
    data: () => ({
        drawer: true,
        isLoading: false,
        isEnded: false,
        isDone: false,
        isProcesed: false,
        saved: false,
        isDiscount: false,
        colores: ["purple", "orange", "teal", "pink", "cyan"],
        carrito: [],
        venta: {
            idcaja: 0,
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
        proceso: {
            documento: "",
        },
        error: {
            status: false,
            msg: "",
        },
    }),
    methods: {
        verificarCaja() {
            this.$axios
                .get("/cajas/disponibles/" + localStorage.getItem("CASH_ID"))
                .then((r) => {
                    if (!r.data.idcaja) {
                        this.$router.push("/tienda/vender/cajas");
                    } else {
                        this.venta.idcaja = r.data.idcaja;
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
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
                this.venta.articulos =
                    this.venta.articulos + parseInt(e.carrito);
                this.venta.subtotal +=
                    parseInt(e.carrito) * parseFloat(e.precio);
                this.venta.costo +=
                    parseInt(e.carrito) * parseFloat(e.costo).toFixed(2);
            });

            this.venta.total =
                this.venta.subtotal -
                ((parseFloat(this.venta.ofertas) || 0) +
                    (parseFloat(this.venta.descuento) || 0));

            this.venta.ganancia = this.venta.total - this.venta.costo;
            let content = document.getElementsByClassName(
                "v-navigation-drawer__content"
            );

            this.$nextTick(() => {
                content[0].scrollTop = content[0].scrollHeight;
            });
        },

        async procesar() {
            this.isProcesed = true;
            await this.$axios
                .post("/ventas/vender", {
                    venta: this.venta,
                    carrito: this.carrito,
                })
                .then((result) => {
                    this.proceso = result.data;
                    this.isEnded = false;
                    this.isDone = true;
                    this.limpiar();
                })
                .catch((err) => {
                    console.log("error");
                });

            this.isProcesed = false;
        },
        limpiar() {
            this.carrito = [];
            let idcaja = this.venta.idcaja;
            this.venta = {
                idcaja: idcaja,
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
            };
            this.$route.replace(this.$route.path);
        },
        async generarRecibo() {
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
        async generarFactura(id) {
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
    },

    computed: {
        descuento() {
            return this.venta.descuento;
        },
        efectivo() {
            return this.venta.efectivo;
        },
        idcaja() {
            return this.$route.params.idcaja;
        },
        cajaNombre() {
            return localStorage.getItem("CAJA_NOMBRE");
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
.shadow-top {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 10px; /* Ajusta la altura de la sombra según sea necesario */
    background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.2) 0%,
        rgba(0, 0, 0, 0) 100%
    ) !important;
}
.shadow-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 10px; /* Ajusta la altura de la sombra según sea necesario */
    background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.2) 0%,
        rgba(0, 0, 0, 0) 100%
    ) !important;
}
</style>
