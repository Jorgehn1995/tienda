<template>
    <div>
        <v-container>
            <caja-habilitada v-slot="{ caja, isLoading, cambiarEstado }">
                <div class="d-flex justify-center">
                    <v-card outlined class="rounded-lg" width="450">
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
};
</script>

<style></style>
