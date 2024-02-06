<template>
    <div>
        <div v-shortkey="['ctrl', 4]" @shortkey="skFocus"></div>

        <v-simple-table>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">Presentación</th>
                        <th class="text-left">Existencias</th>

                        <th class="text-left">
                            <v-chip
                                label
                                small
                                color="info--text"
                                class="v-chip--active ml-1"
                            >
                                Agregar Stock</v-chip
                            >
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(precio, index) in precios">
                        <td>
                            <div
                                class="d-flex justify-start align-center"
                                style="height: 60px !important"
                            >
                                {{ precios[index].nombre }}
                            </div>
                        </td>
                        <td>
                            <v-chip
                                label
                                color="green"
                                dark
                                v-if="precios[index].existencia > 0"
                            >
                                {{ precios[index].existencia }}
                            </v-chip>
                            <v-chip
                                v-else
                                label
                                color="grey--text"
                                class="v-chip--active"
                            >
                                {{ precios[index].existencia }}
                            </v-chip>
                        </td>

                        <td>
                            <div class="d-flex justify-start align-center">
                                <v-text-field
                                    type="number"
                                    :ref="'existencia' + index"
                                    v-model="precios[index].stock_nuevo"
                                    persistent-hint
                                    dense
                                    outlined
                                    prepend-icon="mdi-package-variant"
                                    placeholder="###"
                                    @focus="$event.target.select()"
                                    hide-details=""
                                ></v-text-field>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: Array,
            default: () => [],
        },
        costo: {
            type: [Number, String],
            default: 0,
        },
        precio_unitario: {
            type: [Number, String],
            default: 0,
        },
        precios: {
            type: Array,
            default: () => [],
        },
    },

    data: () => ({
        rules: {
            requerido: (v) => !!v || "Campo Requerido",
            min0: (v) => v > 0 || "El precio debe ser mayor a 0",
            min1: (v) => v >= 1 || "La cantidad debe ser mayor a 0",
        },
    }),
    methods: {
        skFocus() {
            this.$refs["existencia0"][0].$refs.input.focus();
        },

        calcularCosto(p) {
            return (this.costo || 0) * (p.cantidad || 0);
        },
        calcularGanancia(p) {
            let precio = p.precio;
            return precio - this.calcularCosto(p);
        },
    },
    computed: {},
};
</script>

<style></style>
