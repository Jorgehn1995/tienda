<template>
    <div>
        <v-container>
            <div
                class="d-flex justify-center align-center"
                v-if="isLoading.init"
            >
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
            <div class="d-flex justify-center align-center" v-else>
                <v-card outlined class="rounded-lg" width="450">
                    <v-card-title> Apertura una Caja </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-form ref="form" lazy-validation>
                            <form-text-field
                                v-model="caja.nombre"
                                label="Nombre de la Caja"
                                placeholder="Indica el nombre de la caja"
                                :rules="[
                                    rules.text.required,
                                    rules.text.min(5),
                                ]"
                            ></form-text-field>
                            <form-text-field
                                v-model="caja.usuario"
                                :rules="[rules.text.required]"
                                disabled
                                label="Usuario"
                            ></form-text-field>
                            <form-text-field
                                :value="fecha"
                                :rules="[rules.text.required]"
                                disabled
                                label="Apertura"
                            ></form-text-field>
                            <form-text-field
                                v-model="caja.monto"
                                :rules="[rules.number.money]"
                                prefix="Q"
                                type="number"
                                label="Monto Inicial"
                            ></form-text-field>
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
                            Crear Caja
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </div>
        </v-container>
    </div>
</template>

<script>
import FormTextField from "../../../../components/forms/form-text-field.vue";
import rules from "@/configs/rules";
import moment from "moment";
export default {
    components: { FormTextField },
    mounted() {
        this.init();
    },
    data: () => ({
        isLoading: {
            init: false,
            save: false,
        },
        caja: {
            idcaja: "",
            idusuario: 0,
            nombre: "",
            usuario: "",
            fecha: "",
            monto: 0,
        },
        keys: {
            id: "CAJA_ID",
            nombre: "CAJA_NOMBRE",
        },
        rules: rules,
    }),
    methods: {
        async init() {
            this.isLoading.init = true;
            if (localStorage.getItem(this.keys.id)) {
                this.caja.id = localStorage.getItem(this.keys.id);
                this.caja.nombre = localStorage.getItem(this.keys.nombre);
            } else {
                this.caja.id == "new";
            }
            await this.$axios
                .get("/cajas/" + this.caja.id)
                .then((result) => {
                    if (result.data.idcaja) {
                        this.vender(result.data.idcaja, result.data.nombre);
                    }
                    this.caja.fecha = result.data.fecha;
                    this.caja.usuario = result.data.usuario;
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
                    .post("/cajas", this.caja)
                    .then((result) => {
                        this.vender(result.data.idcaja, result.data.nombre);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                this.isLoading.save = false;
            }
        },
        async vender(id, nombre) {
            localStorage.setItem(this.keys.id, id);
            localStorage.setItem(this.keys.nombre, nombre);
            this.$router.push("/tienda/vender/caja/" + id);
        },
    },
    computed: {
        fecha() {
            return moment(this.caja.fecha).format("DD/MM/YYYY HH:mm");
        },
    },
};
</script>

<style></style>
