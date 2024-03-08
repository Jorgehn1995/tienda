<template>
    <div>
        <v-simple-table>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">Ingreso</th>
                        <th class="text-left">Vencimiento</th>
                        <th class="text-center">Días para vencer</th>

                        <th class="text-center">
                            Unidades <br />
                            Ingresadas
                        </th>
                        <th class="text-center">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(v, i) in vencimientos">
                        <td>
                            {{ moment(v.ingreso).format("DD/MM/Y") }}
                        </td>
                        <td>
                            <v-text-field
                                type="date"
                                v-model="vencimientos[i].vencimiento"
                                persistent-hint
                                dense
                                outlined
                                placeholder="###"
                                @focus="$event.target.select()"
                                hide-details=""
                            ></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-chip
                                v-if="v.vencimiento"
                                :color="
                                    vencimientoDias(v.ingreso, v.vencimiento) <
                                    0
                                        ? 'red'
                                        : ''
                                "
                            >
                                {{ vencimientoDias(v.ingreso, v.vencimiento) }}
                                días
                            </v-chip>
                            <v-chip v-else> No Vence </v-chip>
                        </td>

                        <td class="text-center">
                            {{ v.detalles }}
                        </td>
                        <td class="text-center">
                            <v-chip color="teal" v-if="v.estado == 1" dark>
                                Activo
                            </v-chip>
                            <v-chip
                                color="orange"
                                v-else-if="v.estado == 2"
                                dark
                            >
                                Prox. Venc.
                            </v-chip>
                            <v-chip
                                color="error"
                                v-else-if="v.estado == 3"
                                dark
                            >
                                Vencido
                            </v-chip>
                            <v-chip color="info" v-else-if="v.estado == 4" dark>
                                Revisado
                            </v-chip>
                            <v-chip color="grey" v-else dark> Retirado </v-chip>
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
    </div>
</template>

<script>
import moment from "moment";

export default {
    props: {
        value: {
            type: Array,
            default: () => [],
        },
    },
    data: () => ({
        isLoading: false,
        moment: moment,
    }),
    methods: {
        vencimientoDias(i, f) {
            return this.moment(f).diff(this.moment(i), "days");
        },
    },
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
