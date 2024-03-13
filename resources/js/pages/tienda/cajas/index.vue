<template>
    <div>
        <v-container>
            <div class="d-flex justify-center align-center">
                <v-card outlined class="rounded-lg" width="450">
                    <v-card-title> Apertura una Caja </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <form-text-field label="Usuario"></form-text-field>
                        <form-text-field label="Fecha"></form-text-field>
                        <form-text-field label="Caja"></form-text-field>
                        <form-text-field
                            label="Monto Inicial"
                        ></form-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn>
                            <v-icon left>mdi-chevron-left</v-icon>
                            Regresar
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn>
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
import FormTextField from "../../../components/forms/form-text-field.vue";
export default {
    components: { FormTextField },
    data: () => ({
        isLoading: false,
        caja: {
            idcaja: "",
            idusuario: 0,
            usuario: "",
            fecha: "",
            monto: 0,
        },
    }),
};
</script>

<style></style>
