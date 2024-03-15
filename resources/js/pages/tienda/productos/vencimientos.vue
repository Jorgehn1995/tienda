<template>
    <div>
        <v-card tile>
            <v-card-text>
                <busqueda-text-field
                    :elevation="0"
                    prefix="vencimientos_search"
                    label="Fecha a Analizar"
                    class="mt-2"
                    type="date"
                >
                    <v-btn
                        dark
                        block
                        outlined
                        color="info"
                        to="/tienda/productos/editar"
                        v-shortkey="['ctrl', 'l']"
                        :loading="isLoading"
                    >
                        Imprimir
                        <v-icon right>mdi-printer</v-icon>
                    </v-btn>
                </busqueda-text-field>
            </v-card-text>
        </v-card>
        <router-view :fecha="formato_fecha"></router-view>
    </div>
</template>

<script>
import BusquedaTextField from "../../../components/busqueda/busquedaTextField.vue";

import FormTextField from "../../../components/forms/form-text-field.vue";
import moment from "moment";
export default {
    components: { FormTextField, BusquedaTextField },
    data: () => ({
        isLoading: false,
    }),
    computed: {
        formato_fecha() {
            return moment(this.$route.query.vencimientos_search).isValid()
                ? this.$route.query.vencimientos_search
                : moment().format("Y-MM-DD");
        },
    },
};
</script>

<style></style>
