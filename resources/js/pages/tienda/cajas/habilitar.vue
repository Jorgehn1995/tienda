<template>
    <div>
        <v-container>
            <caja-habilitada v-slot="{ caja }">
                <div>
                    <v-card
                        v-if="caja.estado"
                        outlined
                        class="rounded-lg"
                        width="450"
                    >
                        <v-card-title>
                            Caja Habilitada
                            <v-icon>mdi-check</v-icon>
                        </v-card-title>
                        <v-card-subtitle>
                            Este dispositivo ya ha sido registrado y está
                            habilitado para realizar ventas
                        </v-card-subtitle>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="error"
                                outlined
                                @click="cambiarEstado(caja)"
                                :loading="isLoading"
                            >
                                <v-icon left>mdi-cellphone-link-off</v-icon>
                                Deshabilitar Dispositivo
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                    <v-card v-else outlined class="rounded-lg" width="450">
                        <v-card-title>
                            Caja Deshabilitada
                            <v-icon>mdi-close</v-icon>
                        </v-card-title>
                        <v-card-subtitle>
                            Este dispositivo ya ha sido registrado pero se
                            encuentra deshabilitado y no puede ser utilizado
                            para ventas
                        </v-card-subtitle>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="teal"
                                outlined
                                @click="cambiarEstado(caja)"
                                :loading="isLoading"
                            >
                                <v-icon left>mdi-cellphone-link</v-icon>
                                Habilitar Dispositivo
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </div>
            </caja-habilitada>
        </v-container>
    </div>
</template>

<script>
import CajaHabilitada from "../../../components/ventas/caja-habilitada.vue";

export default {
    components: { CajaHabilitada },

    data: () => ({
        isLoading: false,
    }),
    methods: {
        async cambiarEstado(caja) {
            this.isLoading = true;
            await this.$axios
                .get("/cajas/estado/" + caja.idcaja)
                .then((result) => {
                    caja.estado = result.data.estado;
                })
                .catch((err) => {
                    console.log(err);
                });
            this.isLoading = false;
        },
    },
};
</script>

<style></style>
