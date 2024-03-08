<template>
    <div>
        <v-simple-table>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">#</th>
                        <th class="text-left">Ingreso</th>
                        <th class="text-center">Vencimiento</th>
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
                            {{ i + 1 }}
                        </td>
                        <td>
                            {{ moment(v.ingreso).format("DD/MM/Y") }}
                        </td>
                        <td class="text-center">
                            <div style="min-width: 150px; max-width: 150px">
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
                            </div>
                        </td>
                        <td class="text-center">
                            <v-chip
                                v-if="v.vencimiento"
                                dark
                                :color="
                                    color(
                                        vencimientoDias(moment(), v.vencimiento)
                                    )
                                "
                            >
                                <span
                                    v-if="
                                        vencimientoDias(
                                            moment(),
                                            v.vencimiento
                                        ) <= 0
                                    "
                                >
                                    Vencido
                                </span>
                                <span v-else>
                                    {{
                                        vencimientoDias(moment(), v.vencimiento)
                                    }}
                                    días
                                </span>
                            </v-chip>
                            <v-chip v-else> No Vence </v-chip>
                        </td>

                        <td class="text-center">
                            {{ v.detalles }}
                        </td>
                        <td class="text-center">
                            <div style="min-width: 170px; max-width: 170px">
                                <v-select
                                    outlined
                                    class="rounded-lg"
                                    dense
                                    hide-details=""
                                    :items="estados"
                                    v-model="vencimientos[i].activo"
                                >
                                    <template v-slot:selection="{ item }">
                                        <v-chip
                                            small
                                            dark
                                            :color="
                                                item.value ? 'teal' : 'info'
                                            "
                                        >
                                            <v-icon left small>{{
                                                item.icon
                                            }}</v-icon>
                                            {{ item.text }}
                                        </v-chip>
                                    </template>
                                </v-select>
                            </div>
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
        estados: [
            { value: 1, text: "Activo", icon: "mdi-check" },
            {
                value: 0,
                text: "Revisado",
                icon: "mdi-clipboard-search-outline",
            },
        ],
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
