<template>
    <div>
        <v-btn
            color="error"
            @click="isOpen = true"
            :disabled="venta.anulado == 1 || disabled"
        >
            <v-icon left>mdi-cart-remove</v-icon>
            Anular
        </v-btn>
        <v-dialog v-model="isOpen" width="400">
            <v-card outlined elevation="0" class="rounded-lg">
                <v-card-title class="error--text">
                    Anular Transacción
                </v-card-title>
                <v-card-text>
                    ¿Seguro que desea enular la transacción
                    {{ venta.documento }}?
                    <br />
                    <strong> Esta acción no se puede revertir </strong>
                    <v-alert text type="error" v-if="error.status">
                        <strong>Error:</strong>
                        {{ error.message }}
                    </v-alert>
                </v-card-text>
                <v-card-actions>
                    <v-btn @click="isOpen = false">
                        <v-icon left>mdi-chevron-left</v-icon>
                        Cancelar
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="error"
                        @click="procesar()"
                        :loading="isLoading"
                    >
                        <v-icon left>mdi-cart-remove</v-icon>
                        Anular Transacción
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: Object,
            required: true,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    data: () => ({
        isLoading: false,
        isOpen: false,
        error: {
            status: false,
            message: "",
        },
    }),
    methods: {
        async procesar() {
            this.isLoading = true;
            await this.$axios
                .delete("/venta/" + this.venta.idventa + "/anular")
                .then((result) => {
                    this.venta = result.data;
                    this.$emit("actualizado", result.data);
                    this.isOpen = false;
                })
                .catch((err) => {
                    this.error.message =
                        "Se ha producido un error al anular el documento";
                    this.error.status = true;
                });

            this.isLoading = false;
        },
    },
    computed: {
        venta: {
            get() {
                return this.value;
            },
            set(n) {
                this.$emit("input", n);
            },
        },
    },
};
</script>

<style></style>
