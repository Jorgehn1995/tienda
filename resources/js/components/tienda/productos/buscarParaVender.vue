<template>
    <div>
        <productos-busqueda-precios
            :elevation="0"
            @porcodigo="agregarProducto"
            @portexto="seleccionarProducto"
            @suma="$emit('suma', $event)"
            @multi="$emit('multi', $event)"
        ></productos-busqueda-precios>
        <v-card elevation="0" outlined tile>
            <v-card-title>
                Resultados
                <div class="ml-1">
                    <span class="caption">Seleccionar</span>

                    <v-chip
                        label
                        color="grey--text"
                        class="ml-1 v-chip--active"
                    >
                        <v-icon>mdi-arrow-down-bold-box-outline</v-icon>
                    </v-chip>

                    <v-chip
                        label
                        color="grey--text"
                        class="ml-1 v-chip--active"
                    >
                        <v-icon>mdi-arrow-up-bold-box-outline</v-icon>
                    </v-chip>
                </div>
            </v-card-title>
            <v-card-subtitle> </v-card-subtitle>
            <v-card-text>
                <v-row dense>
                    <v-col cols="12">
                        <v-simple-table>
                            <template v-slot:default>
                                <thead>
                                    <tr>
                                        <th class="text-left">
                                            Nombre
                                            <br />
                                            Código
                                        </th>

                                        <th class="text-center">Marca</th>
                                        <th class="text-center">
                                            Concentración
                                        </th>
                                        <th class="text-center">
                                            Presentación
                                        </th>
                                        <th class="text-center">Unidades</th>
                                        <th class="text-right">
                                            Precio Unitario
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="(producto, i) in listaTexto"
                                        :key="'buvp' + i"
                                        :class="
                                            presentacion == i
                                                ? 'teal lighten-4 rounded-lg'
                                                : ''
                                        "
                                    >
                                        <td>
                                            {{ producto.nombre }}
                                            <br />
                                            <span class="caption">
                                                {{ producto.codigo }}
                                            </span>
                                        </td>
                                        <td class="text-center">
                                            {{ producto.marca }}
                                        </td>
                                        <td class="text-center">
                                            {{ producto.dimension }}
                                        </td>
                                        <td class="text-center">
                                            {{ producto.presentacion }}
                                        </td>
                                        <td class="text-center">
                                            {{ producto.cantidad + "u" }}
                                        </td>
                                        <td class="text-right">
                                            <span class="">
                                                Q{{ producto.precio }}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
        <div v-shortkey="['arrowup']" @shortkey="presentacionArriba"></div>
        <div v-shortkey="['arrowdown']" @shortkey="presentacionAbajo"></div>
    </div>
</template>

<script>
import ProductosBusquedaPrecios from "../../v6/productos/productosBusquedaPrecios.vue";
import ProductosMostrarPrecio from "./productosMostrarPrecio.vue";
import ProductosBuscador from "./productosBuscador.vue";
export default {
    components: {
        ProductosBuscador,
        ProductosMostrarPrecio,
        ProductosBusquedaPrecios,
    },
    data: () => ({
        isLoading: false,
        presentacion: 0,
        producto: {
            codigo: "",
            nombre: "",
            cantidad: 1,
            presentacion: 1,
            precio: 0,
            precios: [],
            total: 0,
            producto: {},
        },
        listaTexto: [],
        isSelectable: false,
    }),
    methods: {
        seleccionarProducto(e) {
            this.listaTexto = e;
            this.isSelectable = true;
        },
        presentacionArriba() {
            if (this.presentacion == 0) {
                this.presentacion = this.listaTexto.length - 1;
            } else {
                this.presentacion--;
            }
        },
        presentacionAbajo() {
            if (this.presentacion == this.listaTexto.length - 1) {
                this.presentacion = 0;
            } else {
                this.presentacion++;
            }
        },
        agregarProducto(e) {
            if (!e) {
                return "";
            }
            this.isSelectable = false;
            this.listaTexto = [];
            let p = JSON.parse(JSON.stringify(this.producto));

            p.codigo = e.codigo;
            p.nombre = e.nombre + " " + e.marca + " " + e.dimension;
            p.cantidad = 1;
            p.presentacion =
                e.precios[0].nombre + " / " + e.precios[0].cantidad + "u";
            p.precio = parseFloat(e.precios[0].precio).toFixed(2);
            p.precios = e.precios;
            p.presentacionIndex = 0;
            p.costo = e.precios[0].costo;
            p.carrito = e.codigo + "-" + p.precio;
            p.producto = e;
            p.descuentos = [];

            this.$emit("producto", p);
        },
    },
};
</script>

<style></style>
