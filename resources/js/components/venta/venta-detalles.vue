<template>
    <div>
        <v-btn color="primary" small outlined @click="isOpen = true">
            <v-icon small> mdi-eye </v-icon>
        </v-btn>
        <v-dialog v-model="isOpen" width="800">
            <v-card class="rounded-lg" elevation="0" outlined>
                <v-card-title> Detalles de la Transacción </v-card-title>
                <v-card-subtitle>
                    Revisa los detalles de la transacción
                </v-card-subtitle>

                <v-card-text>
                    <v-row dense>
                        <v-col cols="12" sm="4">
                            <v-list dense>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-subtitle>
                                            Documento
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                    <v-list-item-content class="text-right">
                                        <v-list-item-title>
                                            {{ venta.documento }}
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-subtitle>
                                            Fecha de Transacción
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                    <v-list-item-content class="text-right">
                                        <v-list-item-title>
                                            {{
                                                moment(venta.created_at).format(
                                                    "DD/MM/Y"
                                                )
                                            }}
                                            <br />
                                            {{
                                                moment(venta.created_at).format(
                                                    "hh:mm a"
                                                )
                                            }}
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-subtitle>
                                            Estado
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                    <v-list-item-content class="text-right">
                                        <v-list-item-title>
                                            <v-chip
                                                color="error--text"
                                                class="v-chip--active"
                                                small
                                                v-if="venta.anulado"
                                            >
                                                <v-icon left small>
                                                    mdi-cancel
                                                </v-icon>
                                                Anulado
                                            </v-chip>
                                            <v-chip
                                                v-else
                                                color="primary--text"
                                                class="v-chip--active"
                                                small
                                            >
                                                <v-icon left small>
                                                    mdi-check
                                                </v-icon>
                                                Procesado
                                            </v-chip>
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-col>
                        <v-col cols="12" sm="4">
                            <v-list dense>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-subtitle>
                                            Articulos
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                    <v-list-item-content class="text-right">
                                        <v-list-item-title>
                                            {{ venta.articulos }}
                                            articulos
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-subtitle>
                                            Cliente
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                    <v-list-item-content class="text-right">
                                        <v-list-item-title>
                                            {{ venta.cliente_nombre || "C/F" }}
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-subtitle>
                                            Cajero
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                    <v-list-item-content class="text-right">
                                        <v-list-item-title>
                                            {{ venta.cajero_nombre }}
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-col>
                        <v-col cols="12" sm="4">
                            <v-list dense>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-subtitle>
                                            Subtotal
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                    <v-list-item-content class="text-right">
                                        <v-list-item-title>
                                            <mostrar-precio
                                                :value="venta.subtotal"
                                            ></mostrar-precio>
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-subtitle>
                                            Descuento
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                    <v-list-item-content class="text-right">
                                        <v-list-item-title>
                                            <mostrar-precio
                                                :value="venta.descuento"
                                            ></mostrar-precio>
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-subtitle>
                                            Total
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                    <v-list-item-content class="text-right">
                                        <v-list-item-title>
                                            <mostrar-precio
                                                :value="venta.total"
                                            ></mostrar-precio>
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-col>
                        <v-col cols="12">
                            <v-simple-table>
                                <template v-slot:default>
                                    <thead>
                                        <tr>
                                            <th class="text-left">#</th>
                                            <th>Código</th>
                                            <th>
                                                Nombre
                                                <br />
                                                Presentacion
                                            </th>
                                            <th class="text-left">Precio</th>

                                            <th class="text-right">Cantidad</th>

                                            <th class="text-right">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-if="venta.detalles.length == 0">
                                            <td colspan="6" class="text-center">
                                                No hay ventas para mostrar
                                            </td>
                                        </tr>
                                        <tr
                                            v-for="(
                                                detalle, i
                                            ) in venta.detalles"
                                        >
                                            <td>
                                                {{ i + 1 }}
                                            </td>
                                            <td>
                                                <span class="text-uppercase">
                                                    {{ detalle.codigo }}
                                                </span>
                                            </td>
                                            <td>
                                                {{ detalle.nombre_producto }}
                                                <br />
                                                {{ detalle.presentacion }}
                                            </td>
                                            <td>
                                                <mostrar-precio
                                                    :size="12"
                                                    :value="detalle.precio"
                                                ></mostrar-precio>
                                            </td>
                                            <td class="text-right">
                                                {{ detalle.unidades_vendidas }}
                                            </td>
                                            <td>
                                                <mostrar-precio
                                                    :size="12"
                                                    :value="detalle.total || 0"
                                                ></mostrar-precio>
                                            </td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-btn depressed @click="isOpen = false">
                        <v-icon>mdi-chevron-left</v-icon>
                        Regresar
                    </v-btn>
                    <v-spacer></v-spacer>
                    <venta-anular
                        v-model="venta"
                        :disabled="!turno"
                        class="mr-2"
                    ></venta-anular>
                    <venta-recibo class="mr-2" v-model="venta"></venta-recibo>
                    <v-btn color="secondary" disabled>
                        <v-icon left>mdi-printer</v-icon>
                        Factura
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import MostrarPrecio from "../productos/mostrarPrecio.vue";
import VentaRecibo from "./venta-recibo.vue";
import VentaAnular from "./venta-anular.vue";
import moment from "moment";
export default {
    components: { VentaRecibo, VentaAnular, MostrarPrecio },
    props: {
        value: {
            type: Object,
            required: true,
        },
        turno: {
            type: Boolean,
            default: false,
        },
    },
    data: () => ({
        isLoading: false,
        isOpen: false,
        moment,
    }),
    computed: {
        venta: {
            get() {
                return this.value;
            },
            set(n) {
                this.$emit("input", n);
            },
        },
    },
};
</script>

<style></style>
