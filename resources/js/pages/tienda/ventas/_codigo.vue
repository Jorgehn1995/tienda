<template>
    <div>
        <v-card tile outlined color="teal" dark>
            <v-card-text> asdfasda </v-card-text>
        </v-card>
        <v-container>
            <v-row dense>
                <v-col cols="12" md="4">
                    <v-card outlined class="rounded-lg">
                        <v-card-title> Totales </v-card-title>
                        <v-card-subtitle> Totales de la Caja </v-card-subtitle>
                    </v-card>
                </v-col>
                <v-col cols="12" md="8">
                    <v-card class="rounded-lg" outlined>
                        <v-card-title> Ventas </v-card-title>
                        <v-card-subtitle>
                            Revisa las ventas del día
                        </v-card-subtitle>
                        <v-card-text>
                            <v-simple-table>
                                <template v-slot:default>
                                    <thead>
                                        <tr>
                                            <th class="text-left">#</th>
                                            <th class="text-left">Documento</th>
                                            <th class="text-left">Fecha</th>
                                            <th class="text-left">Articulos</th>
                                            <th class="text-left">Subtotal</th>
                                            <th class="text-left">Descuento</th>
                                            <th class="text-left">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>asdfa</td>
                                            <td>asdfasd</td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    beforeMount() {
        this.codigo = localStorage.getItem("CASH_ID");
        if (this.codigo) {
            this.init();
        }
    },
    data: () => ({
        isLoading: false,
        codigo: "",
        caja: {},
        ventas: [],
    }),
    methods: {
        async init() {
            this.isLoading = true;
            await this.$axios
                .get("/cajas/ventas/" + this.codigo)
                .then((result) => {
                    this.caja = result.data;
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
