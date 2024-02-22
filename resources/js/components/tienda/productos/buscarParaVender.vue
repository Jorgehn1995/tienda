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
            <v-card-title> Resultados de Busqueda </v-card-title>
            <v-card-subtitle>
                <div class="ml-1">
                    <v-divider vertical></v-divider>
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
                    <v-divider class="px-1" vertical></v-divider>
                    <span class="caption">Restar</span>
                    <v-chip
                        label
                        color="grey--text"
                        class="ml-1 v-chip--active"
                    >
                        <v-icon>mdi-arrow-left-bold-box-outline</v-icon>
                    </v-chip>
                    <v-chip
                        label
                        color="grey--text"
                        class="ml-1 v-chip--active"
                    >
                        <v-icon>mdi-arrow-right-bold-box-outline</v-icon>
                    </v-chip>
                    <span class="caption">Sumar</span>
                </div>
            </v-card-subtitle>
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
                                            Presentación
                                        </th>

                                        <th class="text-right">
                                            Precio Unitario
                                        </th>
                                        <th>
                                            <v-icon>mdi-dots-horizontal</v-icon>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody v-if="listaTexto.length == 0">
                                    <tr>
                                        <td colspan="5">
                                            <p class="pa-2 text-center">
                                                <v-icon
                                                    size="120"
                                                    class="my-2"
                                                    color="grey"
                                                >
                                                    mdi-shopping-search-outline
                                                </v-icon>
                                                <br />Busca un producto y
                                                agregalo a al carrito de compras
                                            </p>
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <tr
                                        v-for="(producto, i) in listaTexto"
                                        :key="'buvp' + i"
                                        :class="
                                            presentacion == i
                                                ? 'grey lighten-2 rounded-lg'
                                                : ''
                                        "
                                    >
                                        <td>
                                            <strong>{{
                                                producto.nombre
                                            }}</strong>
                                            <br />
                                            <span class="caption">
                                                {{ producto.codigo }}
                                            </span>
                                        </td>
                                        <td class="text-center">
                                            <v-chip
                                                label
                                                small
                                                color="info--text"
                                                class="v-chip--active"
                                            >
                                                {{ producto.marca }}
                                            </v-chip>
                                        </td>

                                        <td class="text-center">
                                            <div
                                                class="d-flex justify-space-between"
                                                flat
                                                tile
                                            >
                                                <div>
                                                    {{ producto.presentacion }}
                                                </div>
                                                <div>
                                                    {{
                                                        producto.cantidad + "u"
                                                    }}
                                                </div>
                                            </div>
                                        </td>

                                        <td class="text-right">
                                            <span class="">
                                                Q{{ producto.precio }}
                                            </span>
                                        </td>
                                        <td>
                                            <v-btn
                                                icon
                                                large
                                                @click="agregarProductoClick(i)"
                                            >
                                                <v-icon>mdi-plus</v-icon>
                                            </v-btn>
                                        </td>
                                    </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
        <div
            v-shortkey="['arrowright']"
            @shortkey="agregarProducto(listaTexto[presentacion])"
        ></div>
        <div
            v-shortkey="['arrowleft']"
            @shortkey="agregarProducto(listaTexto[presentacion], -1)"
        ></div>
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
        agregarProducto(e, c = 1) {
            if (!e) {
                return "";
            }

            this.isSelectable = false;
            //this.listaTexto = [];
            let p = JSON.parse(JSON.stringify(this.producto));

            p.codigo = e.codigo;
            p.nombre = e.nombre;
            p.marca = e.marca;
            p.dimension = e.dimension;
            p.cantidad = c;
            p.idprecio = e.idprecio;
            p.idproducto = e.idproducto;
            p.presentacion = e.presentacion;
            p.unidades = e.cantidad;
            p.precio = parseFloat(e.precio).toFixed(2);
            p.presentacionIndex = 0;
            p.costo = e.costo;
            p.carrito = e.idprecio;
            p.descuentos = [];

            this.$emit("producto", p);
        },
        agregarProductoClick(i) {
            this.presentacion = i;
            this.agregarProducto(this.listaTexto[this.presentacion]);
        },
    },
};
</script>

<style></style>
