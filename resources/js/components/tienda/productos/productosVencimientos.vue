<template>
    <div>
        <v-simple-table>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">Ingreso</th>
                        <th class="text-center">Vencimiento</th>
                        <th class="text-center">Días para vencer</th>
                        <th class="text-center">Detalles</th>
                        <th class="text-center">Producto Retirado</th>
                        <th class="text-center">Unidades</th>
                    </tr>
                </thead>
                <tbody>
                    <tr></tr>
                </tbody>
            </template>
        </v-simple-table>
    </div>
</template>

<script>
import { computed } from "vue";
export default {
    props: {
        value: {
            type: Array,
            default: () => [],
        },
    },
    data: () => ({
        isLoading: false,
    }),
    computed: {
        vencimientos: {
            get() {
                return this.value;
            },
            set(n) {
                return this.$emit("input", n);
            },
        },
    },
};
</script>

<style></style>
