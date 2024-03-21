<template>
    <div>
        <v-container>
            <v-btn color="primary" to="/tienda/turnos/registrar" outlined>
                Registrar Turno
            </v-btn>
            <v-card class="rounded-lg" outlined elevation="0">
                <v-card-title> Turnos </v-card-title>
                <v-card-subtitle>
                    Turnos de venta en cajas de tu establecimiento
                </v-card-subtitle>
                <v-divider></v-divider>
                <v-card-text>
                    {{ turnos }}
                </v-card-text>
            </v-card>
        </v-container>
    </div>
</template>

<script>
export default {
    mounted() {
        this.init();
    },
    data: () => ({
        isLoading: false,
        turnos: [],
    }),
    methods: {
        async init() {
            this.isLoading = true;
            await this.$axios
                .get("/turnos/" + this.caja)
                .then((result) => {
                    console.log(result.data);
                })
                .catch((err) => {
                    console.log(err);
                });
            this.isLoading = false;
        },
    },
    computed: {
        caja() {
            return localStorage.getItem("CASH_CODE");
        },
    },
};
</script>

<style></style>
