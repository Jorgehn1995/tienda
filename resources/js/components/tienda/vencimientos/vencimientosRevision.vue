<template>
    <div>
        <v-btn class="mt-3 mb-1" outlined @click="open()">
            <v-icon>mdi-clipboard-check-outline</v-icon>
        </v-btn>
        <div>
            <v-dialog
                v-model="isOpen"
                :fullscreen="$vuetify.breakpoint.xsOnly"
                width="350"
                scrollable
            >
                <v-card class="rounded-lg">
                    <v-card-title> Revisión de Vencimiento </v-card-title>
                    <v-card-subtitle>
                        Revisa el vencimiento del producto
                    </v-card-subtitle>
                    <v-card-text class="pt-0">
                        <v-list dense>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-subtitle>
                                        Código
                                    </v-list-item-subtitle>
                                    <v-list-item-title>
                                        {{ vencimiento.producto.codigo }}
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-subtitle>
                                        Producto
                                    </v-list-item-subtitle>
                                    <v-list-item-title>
                                        {{ vencimiento.producto.nombre }}
                                        {{ vencimiento.producto.dimension }} -
                                        {{ vencimiento.producto.marca }}
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-subtitle>
                                        Ingreso del Producto
                                    </v-list-item-subtitle>
                                    <v-list-item-title>
                                        {{ vencimiento.ingreso }}
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-subtitle>
                                        Vencimiento del Producto
                                    </v-list-item-subtitle>
                                    <v-list-item-title>
                                        {{ vencimiento.vencimiento }}
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-subtitle>
                                        Detalles del ingreso
                                    </v-list-item-subtitle>
                                    <v-list-item-title>
                                        {{ vencimiento.detalles }}
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-subtitle>
                                        Unidades a Retirar
                                    </v-list-item-subtitle>
                                    <v-list-item-title>
                                        <v-text-field
                                            outlined
                                            class="rounded-lg"
                                            placeholder="Unidades que se retirarán"
                                            hide-details=""
                                            type="number"
                                            v-model="ajustes.unidades"
                                        ></v-text-field>
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-subtitle>
                                        Comentarios
                                    </v-list-item-subtitle>
                                    <v-list-item-title>
                                        <v-textarea
                                            v-model="ajustes.comentarios"
                                            class="rounded-lg"
                                            outlined
                                            placeholder="Comentarios del retiro"
                                            hide-details=""
                                        >
                                        </v-textarea>
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn @click="isOpen = false">
                            <v-icon left>mdi-chevron-left</v-icon>
                            Cancelar
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                            outlined
                            color="primary"
                            :loading="isLoading"
                            @click="finalizar()"
                        >
                            Finalizar
                            <v-icon right>mdi-check</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: Object,
            default: () => ({}),
        },
    },
    data: () => ({
        isLoading: false,
        isOpen: false,
        ajustes: {
            idproducto: 0,
            idvencimiento: 0,
            unidades: 0,
            comentarios: "",
        },
    }),
    methods: {
        open() {
            this.isOpen = true;
            this.ajustes.idproducto = this.vencimiento.idproducto;
            this.ajustes.idvencimiento = this.vencimiento.idvencimiento;
            this.ajustes.unidades = 0;
            this.ajustes.comentarios = "";
        },
        async finalizar() {
            this.isLoading = true;
            await this.$axios
                .post("/vencimientos", this.ajustes)
                .then((result) => {
                    this.vencimiento.activo = 0;
                    this.isOpen = false;
                })
                .catch((err) => {
                    console.log(err);
                });
            this.isLoading = false;
        },
    },
    computed: {
        vencimiento: {
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
