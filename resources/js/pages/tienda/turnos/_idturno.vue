<template>
    <div>
        <v-container>
            <v-row dense>
                <v-col cols="12">
                    <v-row dense>
                        <v-col cols="12" sm="4" md="4">
                            <v-card
                                dark
                                class="rounded-lg"
                                elevation="0"
                                height="100%"
                            >
                                <v-card-title>
                                    grafica de productos
                                </v-card-title>
                            </v-card>
                        </v-col>
                        <v-col cols="12" sm="8" md="8">
                            <v-row dense>
                                <v-col cols="12" sm="4">
                                    <v-card
                                        class="rounded-lg"
                                        elevation="0"
                                        width="100%"
                                        height="100%"
                                    >
                                        <v-card-subtitle>
                                            <strong>Subtotal</strong>
                                        </v-card-subtitle>
                                        <v-card-text>
                                            <mostrar-precio
                                                :size="30"
                                                :value="turno.subtotal || 0"
                                            ></mostrar-precio>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                                <v-col cols="12" sm="4">
                                    <v-card
                                        class="rounded-lg"
                                        elevation="0"
                                        width="100%"
                                        height="100%"
                                    >
                                        <v-card-subtitle>
                                            <strong>Descuentos</strong>
                                        </v-card-subtitle>
                                        <v-card-text>
                                            <mostrar-precio
                                                :size="30"
                                                :value="turno.descuento || 0"
                                            ></mostrar-precio>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                                <v-col cols="12" sm="4">
                                    <v-card
                                        class="rounded-lg"
                                        elevation="0"
                                        width="100%"
                                        color="primary"
                                        dark
                                        height="100%"
                                    >
                                        <v-card-subtitle>
                                            <strong>Total</strong>
                                        </v-card-subtitle>
                                        <v-card-text>
                                            <mostrar-precio
                                                :size="30"
                                                :value="turno.total || 0"
                                            ></mostrar-precio>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-card
                                        class="rounded-lg"
                                        elevation="0"
                                        width="100%"
                                        height="100%"
                                    >
                                        <v-card-subtitle>
                                            <strong>Articulos Vendidos</strong>
                                        </v-card-subtitle>
                                        <v-card-text class="text-right">
                                            <span
                                                class="text-h4 font-weight-bold"
                                            >
                                                5
                                            </span>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-card
                                        class="rounded-lg"
                                        elevation="0"
                                        width="100%"
                                        height="100%"
                                    >
                                        <v-card-subtitle>
                                            <strong>Estado Actual</strong>
                                        </v-card-subtitle>
                                        <v-card-text class="text-right">
                                            <v-chip
                                                color="green--text"
                                                class="v-chip--active"
                                            >
                                                <v-icon left>
                                                    mdi-progress-clock
                                                </v-icon>
                                                Turno Abierto
                                            </v-chip>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12">
                    <v-row dense>
                        <v-col cols="12" sm="3" md="4">
                            <v-card outlined class="rounded-lg">
                                <v-card-title> Datos del turno </v-card-title>
                            </v-card>
                        </v-col>
                        <v-col cols="12" sm="9" md="8">
                            <v-card outlined class="rounded-lg">
                                <v-card-title> Ventas del turno </v-card-title>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import MostrarPrecio from "../../../components/productos/mostrarPrecio.vue";
export default {
    components: { MostrarPrecio },
    mounted() {
        this.init();
    },
    data: () => ({
        isLoading: false,
        turno: {},
        ventas: [],
    }),
    methods: {
        async init() {
            this.isLoading = true;
            await this.$axios
                .get("/turnos/" + this.idturno)
                .then((result) => {
                    this.turno = result.data;
                    this.ventas = this.turno.ventas;
                    delete this.turno.ventas;
                })
                .catch((err) => {
                    console.log(err);
                });
            this.isLoading = false;
        },
    },
    computed: {
        idturno() {
            return this.$route.params.idturno;
        },
    },
};
</script>

<style></style>
