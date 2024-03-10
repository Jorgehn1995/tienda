<template>
    <div>
        <v-card
            outlined
            elevation="0"
            v-for="(item, i) in carrito"
            :key="'item' + i"
            class="mx-1 mb-1"
        >
            <v-card-text class="py-1">
                <v-row dense>
                    <v-col cols="12" sm="5">
                        <v-list dense class="py-0">
                            <v-list-item-subtitle>
                                {{ item.nombre }} {{ item.cantidad }}
                                {{ item.producto.unidades }}
                            </v-list-item-subtitle>
                            <v-list-item-title>
                                {{ item.producto.nombre }}
                                {{ item.producto.dimension }}
                            </v-list-item-title>
                            <v-list-item-subtitle
                                :class="colores[item.idproducto % 6] + '--text'"
                            >
                                {{ item.producto.marca }}
                            </v-list-item-subtitle>
                        </v-list>
                    </v-col>
                    <v-col cols="12" sm="7">
                        <div class="d-flex justify-space-between">
                            <div>
                                <v-toolbar dense elevation="0">
                                    <v-btn text icon @click="restarProducto(i)">
                                        <v-icon
                                            v-if="item.carrito < 2"
                                            class="error--text"
                                        >
                                            mdi-delete-outline
                                        </v-icon>
                                        <v-icon v-else>mdi-minus</v-icon>
                                    </v-btn>

                                    <div style="max-width: 60px">
                                        <v-text-field
                                            outlined
                                            class="rounded-lg centered-input"
                                            hide-details=""
                                            v-model="carrito[i].carrito"
                                            dense
                                        ></v-text-field>
                                    </div>
                                    <v-btn text icon @click="sumarProducto(i)">
                                        <v-icon>mdi-plus</v-icon>
                                    </v-btn>
                                </v-toolbar>
                            </div>
                            <div class="d-flex align-center">
                                <mostrar-precio
                                    :value="item.precio * carrito[i].carrito"
                                ></mostrar-precio>
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import MostrarPrecio from "../productos/mostrarPrecio.vue";

export default {
    components: { MostrarPrecio },
    props: {
        value: {
            type: Array,
            default: () => [],
        },
        colores: {
            type: Array,
            default: () => [],
        },
    },
    methods: {
        restarProducto(i) {
            if (this.carrito[i].carrito == 1) {
                this.carrito.splice(i, 1);
            } else {
                this.carrito[i].carrito--;
            }
            this.$emit("update");
        },
        sumarProducto(i) {
            this.carrito[i].carrito++;
            this.$emit("update");
        },
    },
    computed: {
        carrito: {
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

<style>
.centered-input input {
    text-align: center;
    font-weight: bold;
    padding: 0;
    margin: 0;
}
</style>
