<template>
    <div>
        <v-card tile>
            <v-card-text class="mb-0 pb-0">
                <busqueda-text-field
                    :elevation="0"
                    prefix="vencimientos_search"
                    label="Fecha a Analizar"
                    class="mt-2"
                    type="date"
                    :actions="false"
                >
                </busqueda-text-field>
            </v-card-text>
            <v-tabs color="primary" centered>
                <v-tab
                    :to="
                        '/tienda/productos/vencimientos/pendientes?vencimientos_search=' +
                        this.$route.query.vencimientos_search
                    "
                    replace
                >
                    <v-icon left>mdi-progress-clock</v-icon>
                    Pendientes
                </v-tab>
                <v-tab
                    :to="
                        '/tienda/productos/vencimientos/revisados?vencimientos_search=' +
                        this.$route.query.vencimientos_search
                    "
                    replace
                >
                    <v-icon left>mdi-clipboard-check-outline</v-icon>
                    Revisados
                </v-tab>
            </v-tabs>
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
