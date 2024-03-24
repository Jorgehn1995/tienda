<template>
    <v-container>
        <div>
            <v-row>
                <v-col cols="12" sm="8" md="6" offset-sm="2" offset-md="3">
                    <v-form ref="form">
                        <v-card outlined elevation="0" class="rounded-lg">
                            <v-card-title> Agregar Usuario </v-card-title>
                            <v-card-subtitle>
                                Agrega un usuario a tu sistema de venta
                            </v-card-subtitle>
                            <v-card-text class="py-2">
                                <form-text-field
                                    label="Nombre"
                                    v-model="data.nombre"
                                    :rules="[rules.requerido, rules.min200]"
                                    outlined
                                    prepend-icon="mdi-account-circle-outline"
                                    placeholder="Nombre"
                                ></form-text-field>
                                <form-text-field
                                    label="Telefono"
                                    v-model="data.telefono"
                                    outlined
                                    prepend-icon="mdi-phone-outline"
                                    placeholder="Telefono"
                                ></form-text-field>
                                <form-text-select
                                    label="Tipo *"
                                    :items="[
                                        {
                                            value: 1,
                                            text: 'Administrador',
                                        },
                                        { value: 2, text: 'Vendedor' },
                                    ]"
                                    item-text="text"
                                    item-value="value"
                                    v-model="data.tipo"
                                    :rules="[rules.requerido]"
                                    outlined
                                    prepend-icon="mdi-store"
                                    placeholder="Usuario"
                                ></form-text-select>
                                <form-text-field
                                    label="Usuario"
                                    v-model="data.usuario"
                                    :rules="[rules.requerido, rules.min40]"
                                    outlined
                                    prepend-icon="mdi-account-circle-outline"
                                    placeholder="Usuario"
                                ></form-text-field>
                                <form-text-field
                                    label="Contraseña *"
                                    v-model="data.password"
                                    :rules="[rules.requerido, rules.min40]"
                                    outlined
                                    prepend-icon="mdi-key"
                                    placeholder="Contraseña"
                                ></form-text-field>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn @click="$router.go(-1)">
                                    <v-icon left>mdi-chevron-left</v-icon>
                                    Regresar
                                </v-btn>
                                <v-spacer></v-spacer>
                                <v-btn
                                    color="primary"
                                    class="px-2"
                                    @click="confirmar()"
                                    :loading="isLoading"
                                >
                                    <v-icon left
                                        >mdi-content-save-outline</v-icon
                                    >
                                    Guardar
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-form>
                </v-col>
            </v-row>

            <v-nice-modal v-model="saved" @go="confirmado()">
                <template v-slot:titulo> Registro Guardado </template>
                <template v-slot:descripcion>
                    El registro ha sido guardado
                </template>
                <template v-slot:btn>
                    <v-icon left>mdi-check</v-icon>
                    Ok, entendido
                </template>
            </v-nice-modal>
            <v-nice-modal
                v-model="error.status"
                color="error"
                @go="error.status = false"
                icon="mdi-alert-outline"
            >
                <template v-slot:titulo> Error </template>
                <template v-slot:descripcion>
                    <div v-html="error.msg"></div>
                </template>
                <template v-slot:btn> Ok, entendido </template>
            </v-nice-modal>
        </div>
    </v-container>
</template>

<script>
import FormTextSelect from "../../../components/forms/form-text-select.vue";
import FormTextField from "../../../components/forms/form-text-field.vue";
import VNiceModal from "../../../components/tienda/generales/v-nice-modal.vue";
export default {
    components: { VNiceModal, FormTextField, FormTextSelect },
    mounted() {},
    data: () => ({
        isLoading: false,

        saved: false,
        data: {
            idcliente: 0,
            usuario: "",
            nombre: "",
            telefono: "",
            direccion: "",
            password: "",
            tipo: 2,
        },
        error: {
            status: false,
            msg: "",
        },
        rules: {
            requerido: (v) => !!v || "Campo Requerido",
            min40: (v) =>
                (v && v.length <= 40) ||
                "La información no deben superar los 40 caracteres",
            min200: (v) =>
                (v && v.length <= 200) ||
                "La información no deben superar los 200 caracteres",
        },
    }),
    methods: {
        confirmar() {
            if (this.$refs.form.validate()) {
                this.guardar();
            }
        },
        async guardar() {
            this.isLoading = true;

            await this.$axios
                .post("/usuarios", this.data)
                .then((result) => {
                    console.log(result.data);
                    this.saved = true;
                })
                .catch((err) => {
                    let errores = err.response.data.errors;
                    for (const key in errores) {
                        for (const error in errores[key]) {
                            this.error.msg =
                                "• " + errores[key][error] + "<br>";
                        }
                    }

                    this.error.status = true;
                });

            this.isLoading = false;
        },
        confirmado() {
            this.$router.go(-1);
        },
    },
};
</script>

<style></style>
