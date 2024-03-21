<template>
    <div>
        <div class="d-flex justify-center align-center" v-if="isLoading.init">
            <v-card outlined class="rounded-lg" width="450" height="350">
                <v-card-text>
                    <div
                        class="d-flex justify-center align-center"
                        style="height: 350px"
                    >
                        <v-progress-circular
                            indeterminate
                        ></v-progress-circular>
                    </div>
                </v-card-text>
            </v-card>
        </div>
        <div v-else-if="turno.idturno > 0">
            <slot v-bind:turno="turno"> </slot>
        </div>

        <div class="d-flex justify-center align-center" v-else>
            <v-card outlined class="rounded-lg" width="450">
                <v-card-title> Registro de Turno </v-card-title>
                <v-card-subtitle>
                    Registra el inicio de un nuevo turno de cobro
                </v-card-subtitle>
                <v-divider></v-divider>
                <v-card-text>
                    <v-form ref="form" lazy-validation>
                        <v-list>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-subtitle>
                                        Caja
                                    </v-list-item-subtitle>
                                </v-list-item-content>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        {{ caja.nombre }}
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-subtitle>
                                        Usuario que apertura
                                    </v-list-item-subtitle>
                                </v-list-item-content>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        {{ turno.nombre }}
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-subtitle>
                                        Fecha de Apertura
                                    </v-list-item-subtitle>
                                </v-list-item-content>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        {{ fecha }}
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>

                        <div style="padding-left: 10px; padding-right: 10px">
                            <form-text-field
                                :column="true"
                                v-model="turno.monto"
                                prefix="Q"
                                type="number"
                                label="Monto de Inicio"
                            ></form-text-field>
                        </div>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-btn text>
                        <v-icon left>mdi-chevron-left</v-icon>
                        Regresar
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        @click="save()"
                        :loading="isLoading.save"
                    >
                        <v-icon left> mdi-content-save </v-icon>
                        Registrar Turno
                    </v-btn>
                </v-card-actions>
            </v-card>
        </div>
    </div>
</template>

<script>
import FormTextField from "../forms/form-text-field.vue";

import rules from "@/configs/rules";
import moment from "moment";
export default {
    components: { FormTextField },
    props: {
        caja: Object,
        required: true,
    },

    mounted() {
        this.init();
    },
    data: () => ({
        isLoading: {
            init: false,
            save: false,
        },
        turno: {
            idturno: 0,
            idcaja: 0,
            nombre: "",
            usuario: "",
            apertura: "",
            monto: 0,
        },

        rules: rules,
    }),
    methods: {
        async init() {
            this.isLoading.init = true;

            await this.$axios
                .get("/cajas/" + this.caja.idcaja + "/turnos-disponibles")
                .then((result) => {
                    this.turno.idturno = result.data.idturno;
                    this.turno.idcaja = result.data.idcaja;
                    this.turno.nombre = result.data.nombre;
                    this.turno.apertura = result.data.apertura;
                })
                .catch((err) => {
                    console.log(err);
                });

            this.isLoading.init = false;
        },
        async save() {
            if (this.$refs.form.validate()) {
                this.isLoading.save = true;
                await this.$axios
                    .post("/turnos", this.turno)
                    .then((result) => {
                        this.turno = result.data;
                        this.$emit("registrado");
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                this.isLoading.save = false;
            }
        },
    },
    computed: {
        fecha() {
            return moment(this.turno.apertura).format("DD/MM/YYYY HH:mm a");
        },
    },
};
</script>

<style></style>
