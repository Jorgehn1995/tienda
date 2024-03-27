<template>
    <div>
        <v-btn color="primary" @click="ver()" :loading="isLoading">
            <v-icon left>mdi-printer</v-icon>
            Recibo
        </v-btn>
        <v-dialog v-model="isOpen" width="900" :fullscreen="fullscreen">
            <v-card outlined elevation="0" class="rounded-lg">
                <v-card-title> Recibo de Transacción </v-card-title>
                <v-card-text>
                    <v-alert text type="error" v-if="error.status">
                        <strong>Error:</strong>
                        {{ error.message }}
                    </v-alert>
                    <iframe
                        :src="url"
                        width="100%"
                        height="500"
                        frameborder="0"
                    ></iframe>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="isOpen = false" large outlined class="px-2">
                        <v-icon left>mdi-chevron-left</v-icon>
                        Regresar
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
    },

    data: () => ({
        isLoading: false,
        isOpen: false,
        fullscreen: false,
        url: "",
        error: {
            status: false,
            message: "",
        },
    }),
    methods: {
        async ver() {
            await this.obtener();
            this.isOpen = true;
        },
        async obtener() {
            this.isLoading = true;
            await this.$axios({
                method: "post",
                url: "/ventas/" + this.venta.idventa + "/recibo",
                responseType: "blob",
                data: this.venta,
            })
                .then((result) => {
                    this.url = window.URL.createObjectURL(
                        new Blob([result.data], {
                            type: "application/pdf",
                        })
                    );
                })
                .catch((err) => {
                    console.log(err);
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
