<template>
    <div>
        <div v-shortkey="['ctrl', 3]" @shortkey="skFocus"></div>

        <v-simple-table>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">Presentación</th>
                        <th class="text-center">Costo</th>
                        <th class="text-center">Cantidad</th>
                        <th class="text-center">Vencimiento</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(precio, index) in precios">
                        <td>
                            <div
                                class="d-flex justify-space-around"
                                style="
                                    height: 60px !important;
                                    word-break: normal;
                                "
                            >
                                <div class="d-flex justify-start align-center">
                                    <div class="pr-1">
                                        <div>
                                            {{ precios[index].nombre }}
                                        </div>
                                        <span
                                            class="caption"
                                            style="white-space: nowrap"
                                        >
                                            {{ precios[index].cantidad }}
                                            unidades
                                        </span>
                                    </div>
                                </div>
                                <div class="d-flex justify-center align-center">
                                    <div
                                        style="white-space: nowrap"
                                        class="pa-1"
                                    >
                                        Q
                                        {{
                                            parseFloat(
                                                precios[index].costo
                                            ).toFixed(2) | formatCurrency
                                        }}
                                    </div>
                                </div>
                            </div>
                        </td>

                        <td>
                            <v-text-field
                                type="number"
                                :ref="'costo' + index"
                                v-model="precios[index].costo_nuevo"
                                prefix="Q"
                                persistent-hint
                                dense
                                outlined
                                prepend-icon="mdi-cash"
                                placeholder="###"
                                @focus="$event.target.select()"
                                hide-details=""
                            ></v-text-field>
                        </td>
                        <td>
                            <v-text-field
                                type="number"
                                :ref="'costo' + index"
                                v-model="precios[index].stock_nuevo"
                                persistent-hint
                                dense
                                outlined
                                prepend-icon="mdi-package-variant-closed-plus"
                                placeholder="###"
                                @focus="$event.target.select()"
                                hide-details=""
                            ></v-text-field>
                        </td>

                        <td>
                            <v-text-field
                                type="date"
                                :ref="'costo' + index"
                                v-model="precios[index].vencimiento"
                                persistent-hint
                                dense
                                outlined
                                placeholder="###"
                                @focus="$event.target.select()"
                                hide-details=""
                            ></v-text-field>
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
            this.$refs["costo0"][0].$refs.input.focus();
        },

        calcularCosto(p) {
            return (this.costo || 0) * (p.cantidad || 0);
        },
        calcularGanancia(p) {
            let precio = p.precio;
            return precio - this.calcularCosto(p);
        },
    },
    computed: {
        precios: {
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
