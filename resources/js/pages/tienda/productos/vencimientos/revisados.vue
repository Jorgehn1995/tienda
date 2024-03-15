<template>
    <div>
        <v-container>
            <div class="d-flex flex-grow-1 flex-column">
                <v-row class="flex-grow-0" dense>
                    <v-col cols="12">
                        <t-listar
                            ref="tabla"
                            tableID="vencimientos.pendientes"
                            prefix="vencimientos_"
                            show-select
                            show-expand
                            toggle-columns
                            :extraQuery="extraQuery"
                            :apiURL="ajustes.ruta"
                            :itemID="ajustes.id"
                            :buscar="ajustes.buscar"
                            @update:search="ajustes.buscar = $event"
                            @click:row="ver($event)"
                            @update:seleccion="seleccion = $event"
                            :truncate="true"
                            :show_menu="true"
                            :pagination="50"
                            :toolbar="false"
                            :sm="12"
                            :md="12"
                            :lg="12"
                        >
                            <template
                                v-slot:toolbar.name="{ reload, isReloading }"
                            >
                                <div class="d-flex d-flex-column align-center">
                                    <div class="mr-1">Productos</div>
                                    <v-btn
                                        color="primary"
                                        class="ml-2"
                                        to="/tienda/productos/editar"
                                    >
                                        <v-icon left>mdi-plus</v-icon>
                                        Crear
                                    </v-btn>
                                </div>
                            </template>

                            <template
                                v-slot:item="{
                                    isSelected,
                                    toggle,
                                    item,
                                    index,
                                }"
                            >
                                <v-row dense>
                                    <v-col cols="12" sm="4" md="4">
                                        <v-card-title>
                                            <a
                                                class="undertext black--text font-weight-bold text-decoration-none"
                                                :href="
                                                    '/tienda/productos/' +
                                                    item.producto.idproducto
                                                "
                                            >
                                                {{ item.producto.nombre }}
                                                {{ item.producto.dimension }}
                                            </a>
                                        </v-card-title>
                                        <v-card-subtitle>
                                            <a
                                                class="text-left undertext teal--text font-weight-bold text-decoration-none"
                                                style="
                                                    min-width: 100px !important;
                                                "
                                                :href="
                                                    '/tienda/productos/' +
                                                    item.producto.idproducto
                                                "
                                            >
                                                <v-icon>mdi-barcode</v-icon>
                                                <span>{{
                                                    item.producto.codigo
                                                }}</span>
                                            </a>
                                            <strong>
                                                {{ item.producto.marca }}
                                            </strong>
                                        </v-card-subtitle>
                                    </v-col>
                                    <v-col cols="12" sm="4" md="4">
                                        <v-list dense>
                                            <v-list-item>
                                                <v-list-item-content>
                                                    <v-list-item-subtitle>
                                                        Revisado:
                                                    </v-list-item-subtitle>
                                                    <v-list-item-title>
                                                        {{ item.retirados }}
                                                        unidades retiradas
                                                    </v-list-item-title>
                                                    <v-list-item-subtitle>
                                                        {{
                                                            item.revision_usuario
                                                        }}
                                                        {{ item.comentarios }}
                                                    </v-list-item-subtitle>
                                                </v-list-item-content>
                                            </v-list-item>
                                        </v-list>
                                    </v-col>
                                    <v-col cols="12" sm="4" md="4">
                                        <v-row dense>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-list dense>
                                                    <v-list-item>
                                                        <v-list-item-content>
                                                            <v-list-item-subtitle>
                                                                Vencimiento:
                                                            </v-list-item-subtitle>
                                                            <v-list-item-title>
                                                                {{
                                                                    item.vencimiento
                                                                }}
                                                            </v-list-item-title>
                                                            <v-list-item-subtitle>
                                                                <v-chip
                                                                    v-if="
                                                                        item.vencimiento
                                                                    "
                                                                    dark
                                                                    :color="
                                                                        color(
                                                                            vencimientoDias(
                                                                                moment(),
                                                                                item.vencimiento
                                                                            )
                                                                        )
                                                                    "
                                                                    small
                                                                >
                                                                    <span
                                                                        v-if="
                                                                            vencimientoDias(
                                                                                moment(),
                                                                                item.vencimiento
                                                                            ) <=
                                                                            0
                                                                        "
                                                                    >
                                                                        Vencido
                                                                    </span>
                                                                    <span
                                                                        v-else
                                                                    >
                                                                        En
                                                                        {{
                                                                            vencimientoDias(
                                                                                moment(),
                                                                                item.vencimiento
                                                                            )
                                                                        }}
                                                                        días
                                                                    </span>
                                                                </v-chip>
                                                                <v-chip
                                                                    v-else
                                                                    small
                                                                >
                                                                    No Vence
                                                                </v-chip>
                                                            </v-list-item-subtitle>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                </v-list>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <div
                                                    class="d-flex justify-center align-center pt-4"
                                                >
                                                    <v-chip
                                                        v-if="item.activo"
                                                        small
                                                        dark
                                                        color="orange"
                                                    >
                                                        <v-icon left small
                                                            >mdi-progress-clock</v-icon
                                                        >
                                                        Pendiente
                                                    </v-chip>
                                                    <v-chip
                                                        v-else
                                                        small
                                                        dark
                                                        color="teal"
                                                    >
                                                        <v-icon left small
                                                            >mdi-check</v-icon
                                                        >
                                                        Revisado
                                                    </v-chip>
                                                </div>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-row>
                            </template>
                        </t-listar>
                    </v-col>
                </v-row>
            </div>
        </v-container>
    </div>
</template>

<script>
import VencimientosRevision from "../../../../components/tienda/vencimientos/vencimientosRevision.vue";
import moment from "moment";

import TListar from "../../../../components/tienda/generales/t-listar.vue";
export default {
    components: { TListar, VencimientosRevision },
    props: {
        fecha: {
            type: String,
            default: "",
            required: true,
        },
    },
    data: () => ({
        isLoading: false,
        ajustes: {
            id: "idvencimiento",
            ruta: "/vencimientos",
            buscar: "",
        },
        extraQuery: "&tipo=revisados",
        moment: moment,
    }),
    methods: {
        vencimientoDias(i, f) {
            return this.moment(f).diff(this.moment(i), "days");
        },
        color(n) {
            if (n <= 0) {
                return "red";
            } else if (n < 10) {
                return "orange";
            } else {
                return "green";
            }
        },
    },
};
</script>

<style></style>
