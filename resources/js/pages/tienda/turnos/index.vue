<template>
    <div>
        <v-container>
            <v-btn color="primary" to="/tienda/turnos/registrar" outlined>
                Registrar Turno
            </v-btn>
            <v-card class="rounded-lg mt-2" outlined elevation="0">
                <v-card-title> Turnos </v-card-title>
                <v-card-subtitle>
                    Turnos de venta en cajas de tu establecimiento
                </v-card-subtitle>
                <v-divider></v-divider>
                <v-card-text>
                    <t-listar
                        ref="tabla"
                        tableID="vencimientos.pendientes"
                        prefix="vencimientos_"
                        show-select
                        show-expand
                        toggle-columns
                        :extraQuery="query"
                        :apiURL="ajustes.ruta"
                        :itemID="ajustes.id"
                        :buscar="ajustes.buscar"
                        @update:search="ajustes.buscar = $event"
                        @click:row="ver($event)"
                        @update:seleccion="seleccion = $event"
                        :truncate="true"
                        :show_menu="true"
                        :pagination="10"
                        :toolbar="false"
                        :sm="12"
                        :md="12"
                        :lg="12"
                    >
                        <template
                            v-slot:item="{ isSelected, toggle, item, index }"
                        >
                            <v-card
                                elevation="0"
                                :to="'/tienda/turnos/' + item.idturno"
                            >
                                <v-row dense>
                                    <v-col cols="12" sm="4" md="4">
                                        <v-card-title>
                                            {{ item.caja.nombre }}
                                        </v-card-title>
                                        <v-card-subtitle class="pb-0">
                                            <span>
                                                Turno iniciado por
                                                <v-chip
                                                    label
                                                    color="grey--text"
                                                    class="v-chip--active"
                                                    small
                                                >
                                                    {{ item.nombre }}
                                                </v-chip>
                                            </span>
                                        </v-card-subtitle>
                                        <v-card-subtitle class="pt-0">
                                            {{
                                                $moment(item.apertura).fromNow()
                                            }}
                                        </v-card-subtitle>
                                    </v-col>
                                    <v-col cols="12" sm="2" md="4">
                                        <v-list dense>
                                            <v-list-item>
                                                <v-list-item-content>
                                                    <v-list-item-subtitle>
                                                        Turno:
                                                    </v-list-item-subtitle>
                                                    <v-list-item-title>
                                                        De
                                                        {{
                                                            moment(
                                                                item.apertura
                                                            ).format(
                                                                "DD/MM/Y hh:mm a"
                                                            )
                                                        }}
                                                    </v-list-item-title>
                                                    <v-list-item-subtitle>
                                                        <span
                                                            v-if="item.cierre"
                                                        >
                                                            a
                                                            {{
                                                                moment(
                                                                    item.cierre
                                                                ).format(
                                                                    "DD/MM/Y hh:mm a"
                                                                )
                                                            }}
                                                        </span>
                                                        <span v-else>
                                                            Sin cierre
                                                        </span>
                                                    </v-list-item-subtitle>
                                                </v-list-item-content>
                                            </v-list-item>
                                        </v-list>
                                    </v-col>
                                    <v-col cols="12" sm="4" md="4">
                                        <div
                                            class="d-flex justify-space-between"
                                        >
                                            <div>
                                                <v-list dense>
                                                    <v-list-item>
                                                        <v-list-item-content>
                                                            <v-list-item-subtitle>
                                                                Estado de Turno:
                                                            </v-list-item-subtitle>
                                                            <v-list-item-title>
                                                                <v-chip
                                                                    color="green--text"
                                                                    class="v-chip--active"
                                                                    v-if="
                                                                        item.cierre
                                                                    "
                                                                >
                                                                    <v-icon
                                                                        left
                                                                    >
                                                                        mdi-check
                                                                    </v-icon>
                                                                    Finalizado
                                                                </v-chip>
                                                                <v-chip
                                                                    v-else
                                                                    color="info--text"
                                                                    class="v-chip--active"
                                                                >
                                                                    <v-icon
                                                                        left
                                                                    >
                                                                        mdi-progress-clock
                                                                    </v-icon>
                                                                    Abierto
                                                                </v-chip>
                                                            </v-list-item-title>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                </v-list>
                                            </div>
                                            <div class="pa-2">
                                                <mostrar-precio
                                                    class="mt-2"
                                                    :value="item.total_ventas"
                                                ></mostrar-precio>
                                            </div>
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </template>
                    </t-listar>
                </v-card-text>
            </v-card>
        </v-container>
    </div>
</template>

<script>
import moment from "moment";
import MostrarPrecio from "../../../components/productos/mostrarPrecio.vue";
import TListar from "../../../components/tienda/generales/t-listar.vue";

export default {
    components: { TListar, MostrarPrecio },
    mounted() {},
    data: () => ({
        isLoading: false,
        ajustes: {
            id: "idturno",
            ruta: "/turnos",
            buscar: "",
        },
        moment,
    }),

    computed: {
        query() {
            return "&CASH_CODE=" + localStorage.getItem("CASH_CODE");
        },
    },
};
</script>

<style></style>
