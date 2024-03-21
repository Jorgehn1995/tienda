<template>
    <div>
        <v-container>
            <caja-habilitada v-slot="{ caja }">
                <turno-habilitado :caja="caja" @registrado="$router.go(-1)">
                    <div class="d-flex justify-center align-center">
                        <v-card
                            outlined
                            class="rounded-lg"
                            width="450"
                            height="350"
                        >
                            <v-card-text>
                                <div
                                    class="d-flex justify-center align-center flex-column"
                                    style="height: 350px"
                                >
                                    <h3 class="text-center">
                                        Ya existe un turno habilitado en esta
                                        caja, cierra el turno actual para
                                        habilitar otro
                                    </h3>
                                    <v-btn
                                        text
                                        class="mt-2"
                                        @click="$router.go(-1)"
                                    >
                                        <v-icon left>mdi-chevron-left</v-icon>
                                        Regresar
                                    </v-btn>
                                </div>
                            </v-card-text>
                        </v-card>
                    </div>
                </turno-habilitado>
            </caja-habilitada>
        </v-container>
    </div>
</template>

<script>
import CajaHabilitada from "../../../components/ventas/caja-habilitada.vue";
import TurnoHabilitado from "../../../components/ventas/turno-habilitado.vue";
export default {
    components: { TurnoHabilitado, CajaHabilitada },
    data: () => ({
        isLoading: true,
    }),
};
</script>

<style></style>
