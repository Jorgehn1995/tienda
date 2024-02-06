<template>
    <div>
        <div v-shortkey="['ctrl', 3]" @shortkey="skFocus"></div>

        <v-simple-table>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">Present.</th>
                        <th class="text-left">Uni.</th>
                        <th class="text-left">
                            <v-chip
                                label
                                small
                                color="info--text"
                                class="v-chip--active ml-1"
                            >
                                Nuevo Costo</v-chip
                            >
                        </th>
                        <th class="text-right">
                            Costo <br />
                            Actual
                        </th>
                        <th class="text-right">
                            Precio <br />
                            Actual
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
                            {{ precios[index].cantidad }}
                            <small>u</small>
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
                                prepend-icon="mdi-cash-multiple"
                                placeholder="###"
                                @focus="$event.target.select()"
                                hide-details=""
                            ></v-text-field>
                        </td>

                        <td>
                            <div
                                class="d-flex justify-end align-center"
                                style="white-space: nowrap"
                            >
                                <strong>
                                    Q
                                    {{
                                        (
                                            Math.round(
                                                precios[index].costo * 100
                                            ) / 100
                                        ).toFixed(2)
                                    }}
                                </strong>
                            </div>
                        </td>
                        <td>
                            <div
                                class="d-flex justify-end align-center"
                                style="white-space: nowrap"
                            >
                                <strong>
                                    Q
                                    {{
                                        (
                                            Math.round(
                                                precios[index].precio * 100
                                            ) / 100
                                        ).toFixed(2)
                                    }}
                                </strong>
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
    computed: {},
};
</script>

<style></style>
