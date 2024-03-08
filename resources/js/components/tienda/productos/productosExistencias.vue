<template>
    <div>
        <div v-shortkey="['ctrl', 3]" @shortkey="skFocus"></div>

        <v-simple-table>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">Presentación</th>
                        <th class="text-center">
                            Existencia <br />
                            Actual
                        </th>
                        <th class="text-center">Cantidad</th>
                        <th class="text-center">Vencimiento</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(precio, index) in precios">
                        <td>
                            <div
                                class="d-flex justify-space-between"
                                style="
                                    height: 60px !important;
                                    word-break: normal;
                                "
                            >
                                <div class="d-flex justify-start align-center">
                                    <div class="pr-1">
                                        <div>
                                            {{
                                                precios[index].nombre ||
                                                "Presentacion " + (index + 1)
                                            }}
                                        </div>
                                        <span
                                            class="caption"
                                            style="white-space: nowrap"
                                        >
                                            {{ precios[index].cantidad || 0 }}
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
                                                precios[index].precio || 0
                                            ).toFixed(2)
                                        }}
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td class="text-center">
                            {{ cantidades[precio.idprecio] || 0 }}
                        </td>
                        <td>
                            <div style="min-width: 120px">
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
                            </div>
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
        existencia: {
            type: Number,
            default: 0,
        },
    },
    mounted() {
        this.calcularExistencias();
    },
    data: () => ({
        rules: {
            requerido: (v) => !!v || "Campo Requerido",
            min0: (v) => v > 0 || "El precio debe ser mayor a 0",
            min1: (v) => v >= 1 || "La cantidad debe ser mayor a 0",
        },
        cantidades: {},
    }),
    methods: {
        skFocus() {
            this.$refs["costo0"][0].$refs.input.focus();
        },
        calcularExistencias() {
            let presentaciones = JSON.parse(JSON.stringify(this.precios));
            presentaciones = presentaciones.reverse();

            let existencias = this.existencia;
            let presentacionesDisponibles = [];

            presentaciones.forEach((presentacion) => {
                let cantidadPresentaciones = Math.floor(
                    existencias / presentacion.cantidad
                );
                presentacionesDisponibles[presentacion.idprecio] =
                    cantidadPresentaciones;
                existencias -= cantidadPresentaciones * presentacion.cantidad;
            });

            this.cantidades = presentacionesDisponibles;
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
    watch: {
        existencia() {
            this.calcularExistencias();
        },
    },
};
</script>

<style></style>
